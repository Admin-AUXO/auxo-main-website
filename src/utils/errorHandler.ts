/**
 * Error Handler Utilities
 * Centralized error handling and logging
 */

export interface ErrorLogContext {
  error: string;
  statusCode?: number;
  email?: string;
  timestamp: string;
  details?: unknown;
}

/**
 * Format error for logging
 */
export function formatError(error: unknown): {
  message: string;
  statusCode?: number;
} {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  const errorStatus = (error as { statusCode?: number })?.statusCode;

  return {
    message: errorMessage,
    statusCode: errorStatus,
  };
}

/**
 * Log error with context
 */
export function logError(
  context: string,
  error: unknown,
  additionalContext?: Record<string, unknown>
): void {
  const { message, statusCode } = formatError(error);

  const logContext: ErrorLogContext = {
    error: message,
    statusCode,
    timestamp: new Date().toISOString(),
    ...additionalContext,
    ...(import.meta.env.DEV && { details: error }),
  };

  console.error(`${context}:`, logContext);
}

/**
 * Create error response
 */
export function createErrorResponse(
  message: string,
  status: number = 500,
  additionalData?: Record<string, unknown>
): Response {
  return new Response(
    JSON.stringify({
      success: false,
      error: message,
      ...additionalData,
    }),
    {
      status,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

/**
 * Create success response
 */
export function createSuccessResponse(
  message: string,
  additionalData?: Record<string, unknown>
): Response {
  return new Response(
    JSON.stringify({
      success: true,
      message,
      ...additionalData,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

/**
 * Handle Zod validation errors
 */
export function handleValidationError(error: unknown): Response | null {
  if (error && typeof error === 'object' && 'errors' in error) {
    const zodError = error as { errors: Array<{ path: (string | number)[]; message: string }> };
    const firstError = zodError.errors[0];
    const friendlyMessage = firstError?.message || 'Please check your form and try again.';

    return createErrorResponse(
      friendlyMessage,
      400,
      {
        errors: zodError.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      }
    );
  }

  return null;
}

