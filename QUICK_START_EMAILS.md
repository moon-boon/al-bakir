# Quick Start: Email Notifications in 5 Minutes

## What You Need
- SendGrid free account (100 emails/day)
- 5 minutes of your time

## Step 1: Create SendGrid Account (2 min)

1. Sign up at https://sendgrid.com/
2. Go to **Settings → API Keys**
3. Create API Key named "Al Bakir"
4. **Copy the key** (save it somewhere)

## Step 2: Verify Sender Email (2 min)

In SendGrid:
1. Go to **Settings → Sender Authentication**
2. Click "Verify a Single Sender"
3. Add your email (e.g., noreply@albakirpvtltd.com)
4. Check email and click verification link
5. **Copy this verified email**

## Step 3: Deploy to Supabase (1 min)

Go to your Supabase project → **Edge Functions** → **Create Function**

1. Name: `send-inquiry-email`
2. Copy code from: `supabase/functions/send-inquiry-email/index.ts`
3. Paste into editor and Deploy
4. After deployed, go to **Settings → Secrets**
5. Add these secrets:
   - Key: `SENDGRID_API_KEY` → Value: (your SendGrid key)
   - Key: `SENDGRID_FROM_EMAIL` → Value: (your verified email)

## Step 4: Create Database Trigger (1 min)

Go to **SQL Editor** in Supabase and run this:

```sql
CREATE OR REPLACE FUNCTION public.notify_new_inquiry()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://syztrsherfhkpkwrrvxe.supabase.co/functions/v1/send-inquiry-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    ),
    body := jsonb_build_object('record', to_jsonb(NEW))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS notify_inquiry_email ON public.inquiries;
CREATE TRIGGER notify_inquiry_email
  AFTER INSERT ON public.inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_inquiry();
```

Replace the `Authorization` token with your Supabase Anon Key (from Project Settings → API).

## Step 5: Test It!

1. Go to your website
2. Submit a test form
3. Check your admin email (Bakirassociates@gmail.com)
4. You should see the inquiry email!

## Done! 🎉

Now every form submission will:
- Email you the inquiry details
- Email the user a confirmation
- Save the data to your Supabase database

## Need Help?

See `SENDGRID_SETUP_GUIDE.md` for detailed troubleshooting and alternative methods.
