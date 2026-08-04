# Email Notifications Setup Guide

This guide will help you set up SendGrid email notifications for form inquiries.

## Step 1: Set Up SendGrid Account

1. Go to [SendGrid](https://sendgrid.com/) and create a free account
2. Verify your email and set up your account
3. Go to **Settings → API Keys** in SendGrid dashboard
4. Click "Create API Key"
5. Name it "Al Bakir" and give it "Full Access"
6. Copy the API key (you'll need it in the next step)

## Step 2: Get SendGrid Sender Email

1. In SendGrid, go to **Settings → Sender Authentication**
2. Click "Verify a Single Sender" or use the verified domain
3. Add your sending email (e.g., `noreply@albakirpvtltd.com` or use your company email)
4. Verify the email by clicking the verification link
5. Copy this email address

## Step 3: Deploy Edge Function to Supabase

### Option A: Using Supabase CLI (Recommended)

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Link your project:
   ```bash
   supabase link --project-ref syztrsherfhkpkwrrvxe
   ```
   (Login with your Supabase account when prompted)

3. Set environment variables:
   ```bash
   supabase secrets set SENDGRID_API_KEY="your_sendgrid_api_key_here"
   supabase secrets set SENDGRID_FROM_EMAIL="your_verified_email@example.com"
   ```

4. Deploy the function:
   ```bash
   supabase functions deploy send-inquiry-email
   ```

### Option B: Manual Deploy via Dashboard

1. Go to your Supabase project
2. Navigate to **Edge Functions**
3. Click "Create a new function"
4. Name it `send-inquiry-email`
5. Copy the entire content from `supabase/functions/send-inquiry-email/index.ts`
6. Paste it into the editor
7. Deploy
8. Go to Settings → Secrets and add:
   - `SENDGRID_API_KEY`: Your SendGrid API key
   - `SENDGRID_FROM_EMAIL`: Your verified sender email

## Step 4: Create Database Trigger

Go to your Supabase dashboard and navigate to **SQL Editor**. Run this SQL:

```sql
-- Create trigger function to call Edge Function
CREATE OR REPLACE FUNCTION public.send_inquiry_email_trigger()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the Edge Function
  PERFORM
    net.http_post(
      url := current_setting('app.edge_function_url') || '/send-inquiry-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.edge_function_secret')
      ),
      body := jsonb_build_object(
        'record', to_jsonb(NEW)
      )
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on inquiries table
DROP TRIGGER IF EXISTS send_inquiry_email_on_insert ON public.inquiries;
CREATE TRIGGER send_inquiry_email_on_insert
  AFTER INSERT ON public.inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.send_inquiry_email_trigger();
```

**Note**: If you get an error about Edge Function URL, use this simpler approach instead:

Go to your Edge Function in Supabase, copy its URL (should look like `https://xxxxx.supabase.co/functions/v1/send-inquiry-email`), then run:

```sql
-- Create webhook trigger using HTTP request
CREATE OR REPLACE FUNCTION public.notify_new_inquiry()
RETURNS TRIGGER AS $$
DECLARE
  v_request_id bigint;
BEGIN
  SELECT net.http_post(
    url := 'https://YOUR_PROJECT_ID.supabase.co/functions/v1/send-inquiry-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer YOUR_ANON_KEY'
    ),
    body := jsonb_build_object('record', to_jsonb(NEW))
  ) INTO v_request_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS notify_inquiry_email ON public.inquiries;
CREATE TRIGGER notify_inquiry_email
  AFTER INSERT ON public.inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_inquiry();
```

Replace:
- `YOUR_PROJECT_ID` with your project ID (from the URL: `syztrsherfhkpkwrrvxe`)
- `YOUR_ANON_KEY` with your Supabase anon key

## Step 5: Test It

1. Go to your website and submit a test inquiry
2. Check your inbox (admin email) for the notification
3. Check the user's email for the confirmation message
4. Verify the data is in the Supabase `inquiries` table

## Troubleshooting

**Email not sending?**
- Check SendGrid account is active and API key is correct
- Verify sender email is verified in SendGrid
- Check Supabase Logs → Edge Functions for errors

**Database trigger not firing?**
- Verify the trigger exists: `SELECT * FROM pg_trigger WHERE tgname = 'notify_inquiry_email';`
- Check that Row Level Security isn't blocking inserts
- Ensure the function has proper permissions

**SendGrid free tier limitations?**
- Free tier allows 100 emails/day
- Upgrade to paid plan for higher limits
- Alternative: Use Resend (resend.com) - free tier with 100/day, similar setup

## Environment Variables Summary

For your `.env.local` (website):
```
VITE_SUPABASE_URL=https://syztrsherfhkpkwrrvxe.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

For Supabase Secrets (Edge Function):
```
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=your_verified_email@example.com
```

## What Happens When Someone Submits?

1. Form data is inserted into the `inquiries` table in Supabase
2. Database trigger automatically fires
3. Edge Function is called with the inquiry data
4. Admin receives an email with inquiry details
5. User receives a confirmation email
6. Data is stored for your reference in Supabase dashboard
