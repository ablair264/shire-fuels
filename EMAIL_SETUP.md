# Email Notification Setup Guide

This guide will help you set up email notifications for enquiries submitted through the Shire Fuels website.

## Overview

When a customer submits an enquiry through any of the contact forms, the system will:
1. Save the enquiry to the Supabase database
2. Send an email notification to `info@shirefuels.co.uk` via Resend

## Prerequisites

- Netlify account (already configured)
- Resend account (free tier available)
- Domain verification in Resend

## Step-by-Step Setup

### 1. Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Verify Your Domain

1. In the Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter `shirefuels.co.uk`
4. Follow the instructions to add DNS records to your domain:
   - Add the provided TXT, SPF, and DKIM records to your DNS settings
   - If your domain is managed by Netlify DNS, add these records in your Netlify DNS settings
   - If managed elsewhere, add them in your domain registrar's DNS panel

**DNS Records to Add:**
```
Type: TXT
Name: resend._domainkey
Value: [Resend will provide this]

Type: TXT
Name: @
Value: v=spf1 include:resend.net ~all

Type: MX (if not already set)
Priority: 10
Value: feedback-smtp.resend.net
```

5. Wait for verification (usually takes a few minutes)
6. Once verified, you'll see a green checkmark next to your domain

### 3. Get Your API Key

1. In the Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Name it: `Shire Fuels Website`
4. Select permission: **Sending access**
5. Click **Add**
6. **IMPORTANT:** Copy the API key immediately - you won't be able to see it again!
   - It will start with `re_`
   - Example: `re_123abc456def789ghi`

### 4. Configure Netlify Environment Variables

1. Go to your Netlify dashboard
2. Select your Shire Fuels site
3. Go to **Site configuration** → **Environment variables**
4. Click **Add a variable**
5. Add the following:
   - **Key:** `RESEND_API_KEY`
   - **Value:** [Paste your Resend API key]
   - **Scopes:** Select all deployment contexts (Production, Deploy Previews, Branch deploys)
6. Click **Create variable**

### 5. Deploy to Netlify

The email functionality is already integrated into the code. Once you've set the environment variable:

1. Commit and push your latest changes to your repository
2. Netlify will automatically deploy
3. Or manually trigger a deploy in the Netlify dashboard

### 6. Test the Email Functionality

1. Visit your live website
2. Fill out any of the contact forms:
   - Homepage horizontal form
   - "Book Delivery" modal (Hero, Oil Tanks, Oils & Lubricants pages)
   - "Enquire Now" modal (Fuel Cards page)
   - Emergency "Read More" modal
3. Submit the form
4. Check `info@shirefuels.co.uk` for the notification email

## Email Template

The notification emails include:
- Customer's name, email, phone (if provided)
- Postcode (if provided)
- Service interested in
- Additional notes (if provided)
- Timestamp of submission
- Reply-to address set to customer's email (for easy responses)

## Troubleshooting

### Emails not arriving?

1. **Check Resend Dashboard**
   - Go to **Logs** in Resend dashboard
   - Look for recent send attempts
   - Check for any error messages

2. **Verify Environment Variable**
   - In Netlify, check that `RESEND_API_KEY` is set correctly
   - Make sure there are no extra spaces in the value

3. **Check Domain Verification**
   - Ensure your domain is fully verified in Resend
   - All DNS records should have green checkmarks

4. **Review Netlify Function Logs**
   - In Netlify dashboard, go to **Functions**
   - Click on `send-enquiry-email`
   - Check the logs for any errors

5. **Test in Development**
   - Run locally with: `netlify dev`
   - Make sure `.env.local` has `RESEND_API_KEY` set
   - Submit a test enquiry

### Common Issues

- **"Email service not configured" error**: Environment variable not set in Netlify
- **Domain verification pending**: DNS records not propagated yet (wait up to 24 hours)
- **401 Unauthorized**: Invalid API key - regenerate in Resend dashboard
- **Emails going to spam**: Complete domain verification including DKIM records

## Development Setup

For local development:

1. Copy `.env.example` to `.env.local`
2. Add your `RESEND_API_KEY` to `.env.local`
3. Run: `netlify dev` (requires Netlify CLI)
4. Test locally before deploying

## Resend Limits

**Free Tier:**
- 100 emails per day
- 3,000 emails per month
- Perfect for a small business website

If you exceed these limits, you'll need to upgrade to a paid plan.

## Support

- **Resend Documentation:** https://resend.com/docs
- **Resend Support:** support@resend.com
- **Netlify Functions Docs:** https://docs.netlify.com/functions/overview/

## Security Notes

- Never commit `.env.local` or any file containing your API key to Git
- The `.gitignore` file is already configured to exclude these files
- API keys are only exposed in Netlify's secure environment
- Client-side code never has access to the API key (it's only in the server function)
