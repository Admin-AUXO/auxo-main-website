/**
 * Maileroo API Utility
 * 
 * Helper functions for interacting with Maileroo Email API and Contacts API.
 * Documentation: https://maileroo.com/docs/email-api/introduction/
 */

const MAILEROO_API_BASE_URL = import.meta.env.MAILEROO_API_BASE_URL || 'https://smtp.maileroo.com/api/v2';
const MAILEROO_API_KEY = import.meta.env.MAILEROO_API_KEY;

interface EmailAddress {
  email: string;
  name?: string;
}

interface SendEmailOptions {
  from: EmailAddress;
  to: EmailAddress[];
  subject: string;
  html?: string;
  plain?: string;
  replyTo?: EmailAddress;
}

interface MailerooResponse {
  success: boolean;
  message: string;
  data?: {
    referenceId?: string;
    [key: string]: unknown;
  };
}

/**
 * Make an authenticated request to Maileroo API
 */
async function mailerooRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (!MAILEROO_API_KEY) {
    throw new Error('MAILEROO_API_KEY is not configured');
  }

  const url = `${MAILEROO_API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': MAILEROO_API_KEY,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = (await response.json()) as MailerooResponse;

  if (!response.ok) {
    const errorMessage = data.message || `HTTP ${response.status}: ${response.statusText}`;
    const error = new Error(errorMessage) as Error & { statusCode?: number };
    error.statusCode = response.status;
    throw error;
  }

  return data as T;
}

/**
 * Send a transactional email using Maileroo API
 * 
 * @param options Email options including from, to, subject, html, plain
 * @returns Reference ID of the sent email
 */
export async function sendEmail(options: SendEmailOptions): Promise<string> {
  const payload = {
    from: {
      address: options.from.email,
      name: options.from.name || '',
    },
    to: options.to.map((addr) => ({
      address: addr.email,
      name: addr.name || '',
    })),
    subject: options.subject,
    html: options.html || '',
    plain: options.plain || '',
    ...(options.replyTo && {
      replyTo: {
        address: options.replyTo.email,
        name: options.replyTo.name || '',
      },
    }),
  };

  const response = await mailerooRequest<MailerooResponse>('/emails', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data?.referenceId || '';
}

/**
 * Create or update a contact in Maileroo
 * 
 * @param email Contact email address
 * @param attributes Optional contact attributes
 * @returns Success status
 */
export async function createOrUpdateContact(
  email: string,
  attributes?: Record<string, string>
): Promise<boolean> {
  try {
    const payload: {
      email: string;
      attributes?: Record<string, string>;
    } = {
      email,
    };

    if (attributes) {
      payload.attributes = attributes;
    }

    await mailerooRequest<MailerooResponse>('/contacts', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return true;
  } catch (error) {
    const errorStatus = (error as { statusCode?: number })?.statusCode;
    // If contact already exists (409 Conflict), try to update it
    if (errorStatus === 409) {
      return updateContact(email, attributes);
    }
    throw error;
  }
}

/**
 * Update an existing contact
 */
async function updateContact(
  email: string,
  attributes?: Record<string, string>
): Promise<boolean> {
  const payload: {
    attributes?: Record<string, string>;
  } = {};

  if (attributes) {
    payload.attributes = attributes;
  }

  await mailerooRequest<MailerooResponse>(`/contacts/${encodeURIComponent(email)}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });

  return true;
}

/**
 * Get contact information
 * 
 * @param email Contact email address
 * @returns Contact information or null if not found
 */
export async function getContact(email: string): Promise<{
  email: string;
  lists?: number[];
  attributes?: Record<string, string>;
} | null> {
  try {
    const response = await mailerooRequest<{
      success: boolean;
      data?: {
        email: string;
        lists?: number[];
        attributes?: Record<string, string>;
      };
    }>(`/contacts/${encodeURIComponent(email)}`, {
      method: 'GET',
    });

    return response.data || null;
  } catch (error) {
    const errorStatus = (error as { statusCode?: number })?.statusCode;
    // 404 means contact doesn't exist, which is fine
    if (errorStatus === 404) {
      return null;
    }
    throw error;
  }
}

/**
 * Subscribe a contact to a list
 * 
 * @param email Contact email address
 * @param listId List ID to subscribe to
 * @returns Success status
 */
export async function subscribeToList(
  email: string,
  listId: number
): Promise<boolean> {
  try {
    await mailerooRequest<MailerooResponse>(
      `/contacts/${encodeURIComponent(email)}/subscribe/${listId}`,
      {
        method: 'POST',
      }
    );

    return true;
  } catch (error) {
    const errorStatus = (error as { statusCode?: number })?.statusCode;
    // If already subscribed (409), that's fine
    if (errorStatus === 409) {
      return true;
    }
    throw error;
  }
}

/**
 * Check if a contact is subscribed to a specific list
 * 
 * @param email Contact email address
 * @param listId List ID to check
 * @returns True if subscribed, false otherwise
 */
export async function isSubscribedToList(
  email: string,
  listId: number
): Promise<boolean> {
  const contact = await getContact(email);
  if (!contact) {
    return false;
  }

  return contact.lists?.includes(listId) || false;
}

