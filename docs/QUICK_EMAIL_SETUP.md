# Quick Email Setup - TL;DR

## ⚡ 5-Minute Setup

### 1. SendGrid Account
```
1. Sign up: https://signup.sendgrid.com/ (Free plan)
2. Get API key: Settings → API Keys → Create
3. Copy key (starts with SG.xxx...)
```

### 2. Add Environment Variables

Create `.env` file in project root:
```bash
SENDGRID_API_KEY=SG.your-key-here
SENDGRID_FROM_EMAIL=noreply@auxodata.ae
CONTACT_EMAIL=hello@auxodata.ae
PUBLIC_SITE_URL=https://auxodata.ae
```

### 3. GitHub Secrets (for production)
```
Repository → Settings → Secrets → New secret

Add these 3 secrets:
- SENDGRID_API_KEY
- SENDGRID_FROM_EMAIL
- CONTACT_EMAIL
```

### 4. Domain Authentication (Do this later, takes 24-48hrs)
```
SendGrid → Settings → Sender Authentication
→ Authenticate Your Domain → Follow wizard
→ Add CNAME records to your DNS
```

## 🧪 Test It

```bash
# Local test
npm run dev
# Go to /contact and submit form

# Check logs for errors
# Check email at hello@auxodata.ae
```

## 📧 What Emails Are Sent?

1. **To You** (hello@auxodata.ae): Notification with all details + reply button
2. **To User**: Professional confirmation email with AUXO branding

## ⚠️ Common Issues

| Problem | Fix |
|---------|-----|
| Emails in spam | Complete domain authentication in SendGrid |
| "API key not configured" | Check `.env` file exists and has correct key |
| Emails not sending | Check SendGrid Activity dashboard for errors |
| DNS verification failing | Wait 24-48hrs after adding CNAME records |

## 🎯 You're Using Google Workspace - Perfect!

SendGrid sends from `noreply@auxodata.ae`, notifications arrive in your Gmail inbox at `hello@auxodata.ae`. Best of both worlds!

## 📊 Free Limits

- 100 emails/day (more than enough for contact forms)
- Unlimited contacts
- Email support

---

**Need detailed instructions?** See `EMAIL_SETUP_GUIDE.md`
