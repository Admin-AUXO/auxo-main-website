/**
 * Test script to verify Maileroo API key
 * Run with: node scripts/test-maileroo.js
 */

import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: join(__dirname, '..', '.env') });

const MAILEROO_API_KEY = process.env.MAILEROO_API_KEY;
const MAILEROO_API_BASE_URL = process.env.MAILEROO_API_BASE_URL || 'https://smtp.maileroo.com/api/v2';
const FROM_EMAIL = process.env.MAILEROO_FROM_EMAIL || 'hello@auxodata.com';
const FROM_NAME = process.env.MAILEROO_FROM_NAME || 'AUXO Data Labs';
const TEST_EMAIL = 'admin@auxodata.com';

async function testMaileroo() {
  console.log('Testing Maileroo API...');
  console.log(`API Key: ${MAILEROO_API_KEY ? MAILEROO_API_KEY.substring(0, 20) + '...' : 'NOT SET'}`);
  console.log(`API Base URL: ${MAILEROO_API_BASE_URL}`);
  console.log(`From: ${FROM_EMAIL} (${FROM_NAME})`);
  console.log(`To: ${TEST_EMAIL}`);
  console.log('');

  if (!MAILEROO_API_KEY) {
    console.error('❌ MAILEROO_API_KEY is not set in environment variables');
    process.exit(1);
  }

  try {
    const payload = {
      from: {
        address: FROM_EMAIL,
        name: FROM_NAME,
      },
      to: [{
        address: TEST_EMAIL,
        name: 'Admin',
      }],
      subject: 'Test Email from AUXO Data Labs Website',
      html: `
        <h2>Maileroo API Test</h2>
        <p>This is a test email to verify the Maileroo API integration.</p>
        <p><strong>Status:</strong> ✅ Success</p>
        <p>Sent at: ${new Date().toISOString()}</p>
      `,
      plain: `Maileroo API Test\n\nThis is a test email to verify the Maileroo API integration.\n\nStatus: ✅ Success\nSent at: ${new Date().toISOString()}`,
    };

    const response = await fetch(`${MAILEROO_API_BASE_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': MAILEROO_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Failed to send test email:');
      console.error(`HTTP Status: ${response.status}`);
      console.error(`Error: ${data.message || JSON.stringify(data)}`);
      process.exit(1);
    }

    console.log('✅ Email sent successfully!');
    console.log(`Response:`, JSON.stringify(data, null, 2));
    console.log(`Check ${TEST_EMAIL} for the test email.`);
  } catch (error) {
    console.error('❌ Failed to send test email:');
    console.error(error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

testMaileroo();

