# Email Integration Setup Guide

This guide will help you set up email functionality for the AUXO Data Labs website contact form.

---

## 🎯 Solution: SendGrid + Google Workspace

**What you'll get:**
- ✅ Professional emails sent from `noreply@auxodata.ae`
- ✅ Notifications received in your Google Workspace inbox (`hello@auxodata.ae`)
- ✅ Auto-reply confirmation emails to users
- ✅ Beautiful HTML email templates
- ✅ Free for up to 100 emails/day (plenty for a contact form)

---

## 📋 Step-by-Step Setup

### **Phase 1: SendGrid Account Setup (15 minutes)**

#### Step 1: Create SendGrid Account
1. Go to https://signup.sendgrid.com/
2. Sign up using your Google Workspace email (`yourname@auxodata.ae`)
3. Verify your email address
4. Choose the **Free plan** (100 emails/day forever)

#### Step 2: Domain Authentication (IMPORTANT!)

This step is crucial for deliverability (avoiding spam folder).

1. In SendGrid dashboard, go to **Settings** → **Sender Authentication**
2. Click **"Authenticate Your Domain"**
3. Follow the wizard:
   - Select your DNS provider (probably Google Domains or your domain registrar)
   - Enter your domain: `auxodata.ae`
   - Click "Next"

4. SendGrid will provide you with DNS records like this:

```
Type: CNAME
Host: s1._domainkey
Value: s1.domainkey.u12345678.wl123.sendgrid.net

Type: CNAME
Host: s2._domainkey
Value: s2.domainkey.u12345678.wl123.sendgrid.net

Type: CNAME
Host: em1234
Value: u12345678.wl123.sendgrid.net
```

#### Step 3: Add DNS Records to Google Workspace

**Option A: If you manage DNS in Google Domains**
1. Go to https://domains.google.com
2. Select `auxodata.ae`
3. Go to **DNS** tab
4. Click **Manage custom records**
5. Add each CNAME record provided by SendGrid
6. Wait 24-48 hours (usually propagates in 1-2 hours)

**Option B: If you manage DNS elsewhere**
1. Log into your domain registrar (GoDaddy, Namecheap, etc.)
2. Find DNS management
3. Add the CNAME records provided by SendGrid
4. Wait for DNS propagation

#### Step 4: Verify Domain in SendGrid

1. After adding DNS records, wait a few hours
2. Go back to SendGrid → **Settings** → **Sender Authentication**
3. Click **Verify** next to your domain
4. If successful, you'll see a green checkmark ✅

#### Step 5: Create API Key

1. In SendGrid, go to **Settings** → **API Keys**
2. Click **"Create API Key"**
3. Settings:
   - **API Key Name**: `AUXO Website Contact Form`
   - **API Key Permissions**: Choose "Restricted Access"
   - Enable **only**: "Mail Send" → Full Access
4. Click **"Create & View"**
5. **COPY THE API KEY NOW** (you'll only see it once!)

It will look like: `SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

### **Phase 2: Configure Your Website (10 minutes)**

#### Step 1: Create Environment File

1. In your website folder, create a file named `.env`
2. Add these lines (replace with your actual values):

```bash
# SendGrid Configuration
SENDGRID_API_KEY=SG.your-actual-api-key-here
SENDGRID_FROM_EMAIL=noreply@auxodata.ae
CONTACT_EMAIL=hello@auxodata.ae

# Site URL
PUBLIC_SITE_URL=https://auxodata.ae
```

**⚠️ IMPORTANT**: Never commit `.env` to Git! It's already in `.gitignore`.

#### Step 2: Add Environment Variables to GitHub (for production)

Since your site deploys from GitHub, you need to add these to GitHub Secrets:

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add these three secrets:

| Name | Value |
|------|-------|
| `SENDGRID_API_KEY` | Your SendGrid API key (starts with SG.) |
| `SENDGRID_FROM_EMAIL` | `noreply@auxodata.ae` |
| `CONTACT_EMAIL` | `hello@auxodata.ae` |

#### Step 3: Update GitHub Actions Workflow

Your deployment workflow needs to pass these environment variables.

Edit `.github/workflows/deploy.yml`:

```yaml
# Add this under the build step
- name: Build
  run: npm run build
  env:
    SENDGRID_API_KEY: ${{ secrets.SENDGRID_API_KEY }}
    SENDGRID_FROM_EMAIL: ${{ secrets.SENDGRID_FROM_EMAIL }}
    CONTACT_EMAIL: ${{ secrets.CONTACT_EMAIL }}
    PUBLIC_SITE_URL: https://auxodata.ae
```

---

### **Phase 3: Testing (5 minutes)**

#### Local Testing

1. Make sure you have the `.env` file created
2. Run your development server:
   ```bash
   npm run dev
   ```
3. Go to your contact page
4. Fill out and submit the form
5. Check your terminal for any errors
6. Check your email inbox (hello@auxodata.ae)

#### Production Testing

After deploying:
1. Visit your live website
2. Submit a test contact form
3. You should receive:
   - Email notification to `hello@auxodata.ae`
   - Confirmation email sent to the user

---

## 🎨 Email Templates Included

Your contact form will send **two emails**:

### 1. **Notification Email (to you)**
- **To**: hello@auxodata.ae
- **Subject**: "🔔 New Contact Form Submission from [Name]"
- **Contains**: Full contact details, message, timestamp, IP address
- **Reply-To**: Set to the user's email (click reply to respond)

### 2. **Confirmation Email (to user)**
- **To**: User's email address
- **Subject**: "Thank you for contacting AUXO Data Labs"
- **Contains**: Thank you message, copy of their message, estimated response time
- **Branding**: Professional HTML template with AUXO branding

---

## 🔍 Troubleshooting

### Problem: Emails going to spam

**Solution:**
1. Make sure domain authentication is complete (green checkmark in SendGrid)
2. Wait 24-48 hours after adding DNS records
3. Ask recipients to whitelist `noreply@auxodata.ae`
4. Check SPF, DKIM, and DMARC records are correct

### Problem: "SendGrid API key not configured" error

**Solution:**
1. Check `.env` file exists in project root
2. Verify the API key is correct (starts with `SG.`)
3. Make sure the API key has "Mail Send" permissions
4. For production, verify GitHub Secrets are set correctly

### Problem: Emails not sending

**Solution:**
1. Check SendGrid dashboard → **Activity** to see delivery status
2. Look for error messages in server logs
3. Verify the FROM email (`noreply@auxodata.ae`) is verified in SendGrid
4. Check SendGrid account isn't suspended (free accounts have daily limits)

### Problem: DNS verification failing

**Solution:**
1. Use https://mxtoolbox.com/SuperTool.aspx to check if CNAME records exist
2. Enter: `s1._domainkey.auxodata.ae` and check for the CNAME
3. If not found, re-add DNS records and wait longer
4. Some registrars take 24-48 hours to propagate

---

## 📊 Monitoring & Limits

### SendGrid Free Plan Limits
- **100 emails per day** (resets at midnight UTC)
- **2,000 contacts**
- Email support (no phone support)

This is more than enough for a contact form. If you exceed:
- Emails queue and send the next day
- Or upgrade to paid plan ($19.95/month for 40,000 emails)

### Check Email Statistics
1. Go to SendGrid dashboard → **Activity**
2. See all sent emails, delivery status, opens, clicks
3. Check for bounces or spam reports

---

## 🚀 Alternative: Simple Email Service (if SendGrid doesn't work)

If you have issues with SendGrid, here's a simpler alternative using Google Apps Script:

### Quick Alternative Setup (10 minutes)

1. Go to https://script.google.com
2. Create a new project
3. Paste this code:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    MailApp.sendEmail({
      to: "hello@auxodata.ae",
      subject: "New Contact Form: " + data.name,
      body: `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\n\nMessage:\n${data.message}`
    });

    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Deploy as web app (Anyone can access)
5. Copy the web app URL
6. Update your contact form to POST to this URL

**Limitations:**
- Only 100 emails per day
- Less reliable than SendGrid
- No email templates
- Requires Google account access

---

## ✅ Checklist

Before going live, make sure:

- [ ] SendGrid account created
- [ ] Domain authenticated (green checkmark in SendGrid)
- [ ] API key created and copied
- [ ] `.env` file created locally with all variables
- [ ] GitHub Secrets configured
- [ ] GitHub Actions workflow updated
- [ ] Local testing successful
- [ ] Production deployment successful
- [ ] Test email received in Google Workspace inbox
- [ ] User confirmation email looks good

---

## 📞 Need Help?

If you run into issues:

1. Check SendGrid's Activity feed for delivery errors
2. Check browser console for JavaScript errors
3. Check server logs for API errors
4. Verify all environment variables are set correctly
5. Make sure DNS records have propagated (use mxtoolbox.com)

---

## 🎉 You're Done!

Once everything is set up:

✅ Contact form submissions will arrive in `hello@auxodata.ae`
✅ Users get instant confirmation emails
✅ All emails are professionally branded
✅ Spam protection and rate limiting active
✅ Free for up to 100 emails/day

Your website contact form is now fully functional! 🚀
