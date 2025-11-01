# Email Integration Setup Guide

This guide will help you set up email functionality for the AUXO Data Labs website contact form using Brevo (formerly Sendinblue).

---

## 🎯 Solution: Brevo + Google Workspace

**What you'll get:**
- ✅ Professional emails sent from `noreply@auxodata.ae`
- ✅ Notifications received in your Google Workspace inbox (`hello@auxodata.ae`)
- ✅ Auto-reply confirmation emails to users
- ✅ Beautiful HTML email templates
- ✅ Free for up to **300 emails/day** (3x more than SendGrid!)
- ✅ Built-in email marketing tools for newsletter campaigns
- ✅ GDPR compliant out of the box

---

## 📋 Step-by-Step Setup

### **Phase 1: Brevo Account Setup (15 minutes)**

#### Step 1: Create Brevo Account

1. Go to https://www.brevo.com/
2. Click **Sign Up Free**
3. Sign up using your Google Workspace email (`yourname@auxodata.ae`)
4. Verify your email address
5. Complete the account setup wizard
6. Choose the **Free plan** (300 emails/day forever)

#### Step 2: Domain Authentication (IMPORTANT!)

This step is crucial for deliverability (avoiding spam folder).

1. In Brevo dashboard, go to **Senders, Domains & Dedicated IPs** (in Settings menu)
2. Click on the **Domains** tab
3. Click **Authenticate a new domain**
4. Enter your domain: `auxodata.ae`
5. Click **Authenticate**

6. Brevo will provide you with DNS records like this:

```
Type: TXT
Host: @ (or leave empty, or auxodata.ae)
Value: v=spf1 include:spf.brevo.com ~all

Type: TXT
Host: mail._domainkey
Value: v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...

Type: CNAME
Host: brevo._domainkey
Value: brevo._domainkey.brevo.com
```

**Note:** The exact records will be provided by Brevo and may vary. Copy them exactly as shown.

#### Step 3: Add DNS Records to Your Domain

**Option A: If you manage DNS in Google Domains**
1. Go to https://domains.google.com
2. Select `auxodata.ae`
3. Go to **DNS** tab
4. Click **Manage custom records**
5. Add each TXT and CNAME record provided by Brevo
6. Click **Save**
7. Wait 24-48 hours (usually propagates in 1-2 hours)

**Option B: If you manage DNS elsewhere (GoDaddy, Namecheap, etc.)**
1. Log into your domain registrar
2. Find DNS management section
3. Add the TXT and CNAME records provided by Brevo
4. Save changes
5. Wait for DNS propagation

**DNS Record Tips:**
- For TXT records with Host `@`, some registrars require you to leave the field empty or enter your domain name
- Make sure to copy the entire TXT value (they can be very long)
- Some registrars automatically add the domain to the Host field, so `mail._domainkey` might become `mail._domainkey.auxodata.ae`

#### Step 4: Verify Domain in Brevo

1. After adding DNS records, wait a few hours (minimum 1-2 hours)
2. Go back to Brevo → **Settings** → **Senders, Domains & Dedicated IPs** → **Domains**
3. Click **Verify** next to `auxodata.ae`
4. If successful, you'll see a green checkmark ✅ with status "Authenticated"
5. If verification fails, double-check your DNS records using [MXToolbox](https://mxtoolbox.com/SuperTool.aspx)

**Common DNS Verification Issues:**
- DNS records not propagated yet (wait 24-48 hours)
- Missing the `v=spf1` prefix in SPF record
- DKIM record truncated or split incorrectly
- Host field formatted wrong (@ vs empty vs domain name)

#### Step 5: Add Sender Email

1. In Brevo, go to **Settings** → **Senders, Domains & Dedicated IPs** → **Senders**
2. Click **Add a Sender**
3. Enter:
   - **Email**: `noreply@auxodata.ae`
   - **Name**: `AUXO Data Labs`
4. Brevo will send a verification email to `noreply@auxodata.ae`
5. Check your Google Workspace inbox for `noreply@auxodata.ae`
6. Click the verification link in the email
7. Once verified, you'll see ✅ next to the sender

**Important:** You must verify this sender email before you can send emails from it!

#### Step 6: Create API Key

1. In Brevo dashboard, go to **Settings** → **SMTP & API**
2. Click the **API Keys** tab
3. Click **Generate a new API Key**
4. Settings:
   - **API Key Name**: `AUXO Website Contact Form`
   - Leave all permissions at default (or select just "Send transactional emails")
5. Click **Generate**
6. **COPY THE API KEY NOW** (you'll only see it once!)

It will look like: `xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxx`

**⚠️ Security Warning:** Never commit this API key to Git or share it publicly!

---

### **Phase 2: Configure Your Website (10 minutes)**

#### Step 1: Create Environment File

1. In your website project folder (`A:\AUXO\Main Website`), create a file named `.env`
2. Add these lines (replace the API key with your actual one):

```bash
# Brevo Configuration
BREVO_API_KEY=xkeysib-your-actual-api-key-here
BREVO_FROM_EMAIL=noreply@auxodata.ae
BREVO_FROM_NAME=AUXO Data Labs
CONTACT_EMAIL=hello@auxodata.ae

# Site URL
PUBLIC_SITE_URL=https://auxodata.ae
```

**⚠️ IMPORTANT**: Never commit `.env` to Git! It's already in `.gitignore`.

**Explanation of each variable:**
- `BREVO_API_KEY`: Your API key from Brevo (starts with `xkeysib-`)
- `BREVO_FROM_EMAIL`: The verified sender email (must match what you verified in Brevo)
- `BREVO_FROM_NAME`: Display name that appears in recipient's inbox
- `CONTACT_EMAIL`: Where you want to receive contact form notifications
- `PUBLIC_SITE_URL`: Your website URL (used in email links)

#### Step 2: Add Environment Variables to GitHub (for production)

Since your site deploys from GitHub Actions, you need to add these as GitHub Secrets:

1. Go to your GitHub repository: https://github.com/yourusername/auxo-website
2. Click **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret** button

Add these **4 secrets** one by one:

| Secret Name | Value | Example |
|-------------|-------|---------|
| `BREVO_API_KEY` | Your Brevo API key | `xkeysib-abc123...` |
| `BREVO_FROM_EMAIL` | Verified sender email | `noreply@auxodata.ae` |
| `BREVO_FROM_NAME` | Sender display name | `AUXO Data Labs` |
| `CONTACT_EMAIL` | Your business email | `hello@auxodata.ae` |

**How to add a secret:**
1. Click **New repository secret**
2. Enter the **Name** exactly as shown above (case-sensitive)
3. Paste the **Value**
4. Click **Add secret**
5. Repeat for all 4 secrets

#### Step 3: Update GitHub Actions Workflow

Your deployment workflow needs to pass these environment variables during the build.

1. Open `.github/workflows/deploy.yml`
2. Find the build step (should look like `- name: Build`)
3. Add the `env:` section with all variables:

```yaml
- name: Build
  run: npm run build
  env:
    BREVO_API_KEY: ${{ secrets.BREVO_API_KEY }}
    BREVO_FROM_EMAIL: ${{ secrets.BREVO_FROM_EMAIL }}
    BREVO_FROM_NAME: ${{ secrets.BREVO_FROM_NAME }}
    CONTACT_EMAIL: ${{ secrets.CONTACT_EMAIL }}
    PUBLIC_SITE_URL: https://auxodata.ae
```

**Complete example:**
```yaml
- name: Install Dependencies
  run: npm ci

- name: Build
  run: npm run build
  env:
    BREVO_API_KEY: ${{ secrets.BREVO_API_KEY }}
    BREVO_FROM_EMAIL: ${{ secrets.BREVO_FROM_EMAIL }}
    BREVO_FROM_NAME: ${{ secrets.BREVO_FROM_NAME }}
    CONTACT_EMAIL: ${{ secrets.CONTACT_EMAIL }}
    PUBLIC_SITE_URL: https://auxodata.ae

- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
  # ... rest of deploy config
```

4. Save the file
5. Commit and push to GitHub
6. GitHub Actions will use these secrets during deployment

---

### **Phase 3: Testing (5 minutes)**

#### Local Testing

1. Make sure you created the `.env` file with your actual Brevo API key
2. Start your development server:
   ```bash
   npm run dev
   ```
3. Open your browser to `http://localhost:4321`
4. Navigate to the contact page
5. Fill out the contact form with test data
6. Submit the form
7. Check your terminal for any errors
8. Check your Google Workspace inbox (`hello@auxodata.ae`) for the notification email
9. Check the test email address you used for the confirmation email

**Expected behavior:**
- Form submission succeeds (success message appears)
- You receive a notification email at `hello@auxodata.ae`
- The test user receives a confirmation email
- No errors in browser console or terminal

**If emails don't arrive:**
- Check Brevo dashboard → **Statistics** → **Transactional** for delivery status
- Verify your `.env` file has the correct API key
- Ensure `noreply@auxodata.ae` is verified in Brevo
- Check spam folder
- Wait a few minutes (sometimes delayed)

#### Production Testing

After deploying to production:

1. Visit your live website at `https://auxodata.ae`
2. Go to the contact page
3. Submit a real test form with your actual email
4. Verify you receive:
   - ✅ Notification email to `hello@auxodata.ae` with full submission details
   - ✅ Confirmation email to the email you submitted with
5. Test the reply functionality (reply to the notification email should go to the user)
6. Check email formatting looks professional on desktop and mobile

**Production Checklist:**
- [ ] Form submits successfully
- [ ] Notification email arrives at business email
- [ ] Confirmation email arrives at user's email
- [ ] Reply-To works correctly
- [ ] Emails not in spam folder
- [ ] Email templates display correctly
- [ ] No console errors on website

---

## 🎨 Email Templates Included

Your contact form sends **two professionally designed emails**:

### 1. **Notification Email (to you)**

**Recipient:** `hello@auxodata.ae`
**Subject:** `🔔 New Contact Form Submission from [Name]`

**Contains:**
- Full contact details (name, email, company)
- Complete message from user
- Timestamp (Dubai timezone)
- Client IP address (for spam detection)
- Direct reply button to respond to user

**Features:**
- **Reply-To header** set to user's email (click Reply to respond)
- Beautiful HTML template with AUXO branding
- Both HTML and plain text versions
- Mobile-responsive design

### 2. **Confirmation Email (to user)**

**Recipient:** User's submitted email
**Subject:** `Thank you for contacting AUXO Data Labs`

**Contains:**
- Personalized thank you message
- Copy of their submitted message
- Expected response time (24-48 hours)
- Links to explore services and blog
- Professional AUXO branding

**Features:**
- Builds trust with immediate response
- Professional appearance
- Mobile-responsive design
- Both HTML and plain text versions

---

## 🔍 Troubleshooting

### Problem: Emails going to spam

**Symptoms:**
- Emails sent successfully in Brevo dashboard
- But not appearing in inbox (check spam folder)

**Solutions:**
1. ✅ **Complete domain authentication** (green checkmark in Brevo)
   - Go to Brevo → Settings → Domains
   - Verify all DNS records are added correctly
   - Wait 24-48 hours after adding DNS records

2. ✅ **Verify sender email**
   - Go to Brevo → Settings → Senders
   - Ensure `noreply@auxodata.ae` has ✅ verified status

3. ✅ **Check SPF and DKIM records**
   - Use [MXToolbox SPF Check](https://mxtoolbox.com/spf.aspx)
   - Enter: `auxodata.ae`
   - Should show: `v=spf1 include:spf.brevo.com ~all`

4. ✅ **Whitelist your domain**
   - Ask recipients to whitelist `noreply@auxodata.ae` or `@auxodata.ae`
   - Add to contacts in Gmail/Outlook

5. ✅ **Check content spam score**
   - Avoid spam trigger words (FREE, URGENT, CLICK HERE)
   - Use proper HTML structure
   - Include plain text version (already done)

6. ✅ **Build sender reputation**
   - Start with low volume and increase gradually
   - Maintain good engagement (low bounce rate)
   - Don't send to invalid emails

### Problem: "Brevo API key not configured" error

**Symptoms:**
- Form submits but emails don't send
- Console shows: `Brevo API key not configured`

**Solutions:**
1. Check `.env` file exists in project root
   ```bash
   # Navigate to project folder
   cd "A:\AUXO\Main Website"

   # Check if .env exists
   dir .env
   ```

2. Verify `.env` has the correct key format:
   ```bash
   BREVO_API_KEY=xkeysib-xxxxx...
   ```
   - Must start with `xkeysib-`
   - No quotes around the value
   - No spaces before or after `=`

3. Restart development server after creating/editing `.env`:
   ```bash
   # Stop server (Ctrl+C)
   # Then restart
   npm run dev
   ```

4. For production, verify GitHub Secrets:
   - Go to GitHub repo → Settings → Secrets and variables → Actions
   - Verify `BREVO_API_KEY` exists
   - Re-add if necessary (secrets can't be viewed, only replaced)

5. Check API key permissions in Brevo:
   - Go to Brevo → Settings → SMTP & API → API Keys
   - Verify the key has "Send transactional emails" permission

### Problem: Emails not sending at all

**Symptoms:**
- Form submission succeeds
- But no emails received (not even in spam)
- Brevo dashboard shows no activity

**Solutions:**
1. **Check Brevo dashboard for errors:**
   - Go to Brevo → **Statistics** → **Transactional**
   - Look for recent sends
   - Check delivery status (Delivered, Bounced, Blocked)
   - Click on a message to see error details

2. **Verify sender email is verified:**
   - Go to Brevo → Settings → Senders
   - `noreply@auxodata.ae` must have ✅ status
   - If not, verify the email again

3. **Check domain authentication:**
   - Go to Brevo → Settings → Domains
   - `auxodata.ae` must show "Authenticated" status
   - If not, re-verify DNS records

4. **Look for error messages in server logs:**
   - Check browser console (F12 → Console tab)
   - Check terminal where dev server is running
   - Look for Brevo API errors

5. **Verify API key is active:**
   - Go to Brevo → Settings → SMTP & API → API Keys
   - Check the key hasn't been deleted or deactivated
   - Generate a new one if needed

6. **Check account status:**
   - Ensure Brevo account isn't suspended
   - Verify you haven't exceeded 300 emails/day limit
   - Check for any billing issues (shouldn't be any on free plan)

7. **Test with a minimal example:**
   ```bash
   # Create a test file: test-brevo.js
   # Then run: node test-brevo.js
   ```
   See if direct API calls work (rules out website code issues)

### Problem: DNS verification failing

**Symptoms:**
- Added DNS records hours/days ago
- Brevo still shows "Not verified" or "Verification pending"
- Can't send emails from domain

**Solutions:**
1. **Wait longer:**
   - DNS propagation can take 24-48 hours
   - Some registrars are slower than others
   - Try again tomorrow

2. **Verify DNS records using MXToolbox:**
   - Go to https://mxtoolbox.com/SuperTool.aspx
   - Check SPF: Enter `auxodata.ae` and select "SPF Record Lookup"
     - Should show: `v=spf1 include:spf.brevo.com ~all`
   - Check DKIM: Enter `mail._domainkey.auxodata.ae` and select "TXT Lookup"
     - Should show the DKIM public key
   - If not found, DNS records aren't propagated yet

3. **Check DNS record format:**
   - Make sure you copied the entire value (DKIM keys are very long)
   - Check for extra spaces or line breaks
   - Verify Host field is correct:
     - Some registrars need `mail._domainkey`
     - Others need `mail._domainkey.auxodata.ae`
     - Try both if unsure

4. **Re-add DNS records:**
   - Delete existing records
   - Wait 1 hour
   - Add them again with exact values from Brevo
   - Save changes

5. **Contact your DNS provider:**
   - Some registrars have issues with long TXT records
   - May need to split DKIM record or use special format
   - Support can help verify records are correct

6. **Use Brevo's DNS checker:**
   - In domain authentication, Brevo shows which records are missing
   - Focus on fixing those specific records first

7. **Flush DNS cache (on your computer):**
   ```bash
   # Windows
   ipconfig /flushdns

   # Mac
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

   # Linux
   sudo systemd-resolve --flush-caches
   ```

### Problem: Form submission fails with error

**Symptoms:**
- User clicks submit
- Form shows error message
- Nothing sent to API

**Solutions:**
1. Check browser console for JavaScript errors (F12 → Console)
2. Verify form validation rules are met:
   - Name: required, 2-100 characters
   - Email: valid format
   - Company: optional, max 100 characters
   - Message: required, 10-2000 characters
3. Check network tab (F12 → Network) for failed API requests
4. Ensure rate limiting isn't blocking (max 5 requests per 15 min per IP)
5. Verify honeypot field (`website`) is empty (bot detection)

### Problem: Wrong email templates or formatting

**Symptoms:**
- Emails sent successfully
- But content looks wrong or broken

**Solutions:**
1. Check HTML renders correctly:
   - Send test email to yourself
   - View in multiple email clients (Gmail, Outlook, Apple Mail)
   - Check mobile and desktop views

2. Verify environment variables are correct:
   - `BREVO_FROM_NAME`: Should be "AUXO Data Labs"
   - `CONTACT_EMAIL`: Should be `hello@auxodata.ae`
   - Check for typos

3. Test plain text fallback:
   - Some email clients don't support HTML
   - Plain text version should be readable

4. Update templates in code:
   - Edit `src/pages/api/contact.ts`
   - Modify `htmlContent` and `textContent` properties
   - Redeploy website

---

## 📊 Monitoring & Limits

### Brevo Free Plan Limits

**Daily Limits:**
- ✅ **300 emails per day** (resets at midnight UTC)
- ✅ **Unlimited contacts** (can store unlimited email addresses)
- ✅ **Transactional emails** (perfect for contact forms)
- ✅ **Email campaigns** (can send newsletters too)

**Support:**
- ✅ Email support
- ✅ Knowledge base and documentation
- ✅ Community forum
- ❌ No phone support (on free plan)

**What happens if you exceed 300 emails/day?**
- Emails will be queued and sent the next day
- Or upgrade to paid plan:
  - **Lite Plan**: $25/month for 20,000 emails
  - **Business Plan**: $65/month for 40,000 emails + marketing automation

**Is 300 emails/day enough?**
For a contact form, absolutely! Even with 50 inquiries per day, you're only using:
- 50 notification emails (to you)
- 50 confirmation emails (to users)
- = 100 emails total (well under the limit)

### Check Email Statistics

**Real-time monitoring:**
1. Go to Brevo dashboard → **Statistics**
2. Click **Transactional** tab
3. View metrics:
   - Sent emails
   - Delivered successfully
   - Opened (if tracking enabled)
   - Clicked links
   - Bounced (invalid emails)
   - Spam reports

**Per-email details:**
1. Go to **Logs** → **Transactional Logs**
2. See every email sent with:
   - Timestamp
   - Recipient
   - Subject
   - Status (Delivered, Bounced, etc.)
   - Delivery time
   - Error messages (if any)

**Set up alerts:**
1. Go to **Settings** → **Notifications**
2. Enable alerts for:
   - Bounce rate too high
   - Spam reports
   - Daily limit approaching

---

## 🚀 Bonus: Use Brevo for Newsletter Too!

Since you already have Brevo set up, you can use it for your newsletter signup feature:

### Benefits of Using Brevo for Newsletter

1. **Same API key** - No additional setup needed
2. **Unified dashboard** - Manage contact form + newsletter in one place
3. **Better than Mailchimp** - More features on free plan
4. **Email campaigns** - Create and send newsletters from Brevo
5. **Marketing automation** - Set up welcome emails, drip campaigns
6. **GDPR compliant** - Built-in consent management

### Quick Setup for Newsletter Integration

**Current state:** Newsletter signup form exists but doesn't actually subscribe anyone.

**To integrate with Brevo:**

1. **Create a contact list in Brevo:**
   - Go to **Contacts** → **Lists**
   - Click **Create a list**
   - Name: "Newsletter Subscribers"
   - Save the List ID

2. **Update environment variables:**
   ```bash
   # Add to .env
   BREVO_NEWSLETTER_LIST_ID=12345
   ```

3. **Update API endpoint** (`src/pages/api/newsletter.ts`):
   - Use Brevo Contacts API to add subscribers
   - Implement double opt-in (send confirmation email)
   - Store consent timestamp

4. **Create welcome email in Brevo:**
   - Go to **Campaigns** → **Create a campaign**
   - Type: Transactional email triggered by API
   - Send when someone confirms subscription

5. **Add to GitHub Secrets:**
   - `BREVO_NEWSLETTER_LIST_ID`

**Implementation time:** ~2-3 hours

**Result:** Fully functional newsletter with:
- Double opt-in confirmation
- Welcome email
- Unsubscribe link (automatic)
- GDPR compliance
- Send campaigns from Brevo dashboard

---

## ✅ Pre-Launch Checklist

Before going live with email functionality, verify:

### Brevo Configuration
- [ ] Brevo account created (free plan)
- [ ] Domain authenticated (green checkmark in Brevo)
- [ ] Sender email verified (`noreply@auxodata.ae` has ✅)
- [ ] API key created and saved securely
- [ ] Test emails sent successfully from Brevo

### Local Development
- [ ] `.env` file created in project root
- [ ] All 4 environment variables added:
  - `BREVO_API_KEY`
  - `BREVO_FROM_EMAIL`
  - `BREVO_FROM_NAME`
  - `CONTACT_EMAIL`
- [ ] Development server runs without errors (`npm run dev`)
- [ ] Contact form submits successfully
- [ ] Notification email received at business email
- [ ] Confirmation email received by test user
- [ ] Emails look good in inbox (not spam)

### GitHub/Production Setup
- [ ] All 4 GitHub Secrets configured correctly
- [ ] GitHub Actions workflow updated with env variables
- [ ] Workflow file committed and pushed
- [ ] Website builds successfully in GitHub Actions
- [ ] Production deployment successful
- [ ] Live website contact form tested
- [ ] Production emails arriving correctly

### Email Quality
- [ ] Emails not going to spam folder
- [ ] HTML templates display correctly on desktop
- [ ] HTML templates display correctly on mobile
- [ ] Plain text fallback is readable
- [ ] Reply-To functionality works
- [ ] All links in emails work correctly
- [ ] Branding looks professional

### Monitoring & Compliance
- [ ] Brevo dashboard shows successful deliveries
- [ ] No bounce or spam reports
- [ ] Privacy policy mentions email service
- [ ] Cookie consent for potential email tracking
- [ ] GDPR/PDPL compliance verified

---

## 📞 Need Help?

If you encounter issues during setup:

### Self-Help Resources
1. **Brevo Documentation**: https://developers.brevo.com/
2. **Brevo Status Page**: https://status.brevo.com/ (check for outages)
3. **MXToolbox**: https://mxtoolbox.com/ (DNS diagnostics)
4. **Brevo Support**: Submit ticket from dashboard

### Debugging Steps
1. Check Brevo dashboard → **Logs** → **Transactional Logs** for delivery errors
2. Inspect browser console (F12 → Console) for JavaScript errors
3. Check terminal output where `npm run dev` is running
4. Verify all environment variables are spelled correctly
5. Ensure DNS records have fully propagated (24-48 hours)
6. Test with a simple API call outside the website
7. Compare your setup with this guide step-by-step

### Common Gotchas
- ❌ Forgetting to verify sender email in Brevo
- ❌ Not waiting long enough for DNS propagation
- ❌ Typos in environment variable names (case-sensitive!)
- ❌ API key includes spaces or line breaks (copy carefully)
- ❌ GitHub Secrets not configured (build succeeds but emails fail)
- ❌ Wrong email in `BREVO_FROM_EMAIL` (must match verified sender)

---

## 🎉 You're Done!

Once everything is set up and tested, you'll have:

✅ **Fully functional contact form** with email delivery
✅ **Professional email templates** with AUXO branding
✅ **Automatic notifications** to your business email
✅ **Confirmation emails** to customers
✅ **300 emails/day free** (way more than you'll need)
✅ **GDPR compliant** email system
✅ **Spam protection** with rate limiting and honeypot
✅ **Future-ready** for newsletter integration

### Next Steps

**Optional Enhancements:**
1. Integrate newsletter signup with Brevo (2-3 hours)
2. Add email tracking (opens, clicks) via Brevo
3. Set up marketing automation for lead nurturing
4. Create email templates for different customer segments
5. Add SMS notifications (Brevo supports SMS too)

**Maintenance:**
- Monitor Brevo dashboard weekly for delivery issues
- Check spam reports and adjust content if needed
- Keep email templates updated with current branding
- Review email limits monthly (upgrade if approaching 300/day)

Your AUXO Data Labs website now has enterprise-grade email functionality! 🚀

---

*Last updated: 2025-11-02*
*Brevo integration implemented with @getbrevo/brevo SDK*
*Questions? Check the troubleshooting section or contact Brevo support*
