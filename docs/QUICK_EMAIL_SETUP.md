# Quick Email Setup with Brevo - TL;DR

## ⚡ 5-Minute Setup

### 1. Brevo Account (You Already Have This! ✅)
```
✅ You already created your Brevo account
✅ You already have your API key
```

### 2. Add Environment Variables

Create `.env` file in project root:
```bash
BREVO_API_KEY=your-api-key-here
BREVO_FROM_EMAIL=noreply@auxodata.ae
BREVO_FROM_NAME=AUXO Data Labs
CONTACT_EMAIL=hello@auxodata.ae
PUBLIC_SITE_URL=https://auxodata.ae
```

### 3. GitHub Secrets (for production)
```
Repository → Settings → Secrets and variables → Actions → New secret

Add these 4 secrets:
- BREVO_API_KEY (your actual API key)
- BREVO_FROM_EMAIL (noreply@auxodata.ae)
- BREVO_FROM_NAME (AUXO Data Labs)
- CONTACT_EMAIL (hello@auxodata.ae)
```

### 4. Update GitHub Workflow

Edit `.github/workflows/deploy.yml` - Find the build step and add:

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

### 5. Domain Authentication (Optional but Recommended)
```
Brevo Dashboard → Senders & IP
→ Authenticate your domain
→ Add CNAME records to your DNS
→ Wait 24-48hrs for verification
```

## 🧪 Test It

```bash
# Local test
# 1. Create .env file with your Brevo API key
# 2. Run:
npm run dev
# 3. Go to /contact and submit form
# 4. Check email at hello@auxodata.ae
```

## 📧 What Emails Are Sent?

1. **To You** (hello@auxodata.ae): Notification with all details + reply button
2. **To User**: Professional confirmation email with AUXO branding

## 🎯 Why Brevo is Better

- ✅ **300 emails/day** (vs SendGrid's 100)
- ✅ **Built-in email marketing** (can use for newsletter too)
- ✅ **GDPR compliant** (great for UAE/international)
- ✅ **SMS capability** (if you need it later)
- ✅ **Better free tier features**

## ⚠️ Common Issues

| Problem | Fix |
|---------|-----|
| Emails in spam | Complete domain authentication in Brevo |
| "API key not configured" | Check `.env` file exists and has correct key |
| Emails not sending | Check Brevo Dashboard → Statistics for errors |
| DNS verification failing | Wait 24-48hrs after adding CNAME records |

## 📊 Free Limits

- **300 emails/day** (perfect for contact forms)
- **Unlimited contacts**
- **SMS credits available**
- Email + chat support

## 🎁 Bonus: Use Brevo for Newsletter Too!

Since you're using Brevo, you can also use it for your newsletter signup instead of Mailchimp:

1. Same API key works for both
2. Manage contacts in Brevo dashboard
3. Create email campaigns
4. Better integration (all in one place)

---

**Already have your API key?** Just add it to `.env` and GitHub Secrets, then deploy!

**Need detailed instructions?** See `EMAIL_SETUP_GUIDE.md` (updated for Brevo)
