# Resend Email Setup Guide

This guide will help you complete the email notification setup using Resend.

## Step 1: Add Resend Secrets to Supabase

1. Go to your Supabase project dashboard
2. Navigate to **Settings → Edge Functions**
3. Add the following environment variables as secrets:

| Name | Value |
|------|-------|
| `RESEND_API_KEY` | (get from Resend dashboard → API Keys, do not commit to git) |
| `FROM_EMAIL` | `Bakirassociates@gmail.com` |

**How to add secrets:**
- Click **Create a new secret**
- Enter the Name and Value
- Click **Create secret**
- Repeat for both variables

## Step 2: Deploy the Updated Edge Function

The Edge Function at `supabase/functions/send-inquiry-email/index.ts` has been updated to use Resend instead of SendGrid.

To deploy it, run:
```bash
supabase functions deploy send-inquiry-email --project-id syztrsherfhkpkwrrvxe
```

Or via Vercel CLI if you have it set up for your project.

## Step 3: Create the Database Trigger

The database trigger will automatically call the Edge Function whenever a new inquiry is inserted.

**Run this SQL in your Supabase SQL Editor:**

```sql
-- Create a trigger function that calls the Edge Function
CREATE OR REPLACE FUNCTION public.send_inquiry_email_trigger()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the Edge Function via HTTP
  PERFORM
    net.http_post(
      url := 'https://syztrsherfhkpkwrrvxe.functions.supabase.co/send-inquiry-email',
      headers := jsonb_build_object('Content-Type', 'application/json'),
      body := jsonb_build_object(
        'record', row_to_json(NEW)
      )
    );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Log the error but don't fail the insert
  RAISE WARNING 'Failed to send inquiry email: %', SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS inquiry_email_trigger ON inquiries;

-- Create the trigger
CREATE TRIGGER inquiry_email_trigger
AFTER INSERT ON inquiries
FOR EACH ROW
EXECUTE FUNCTION send_inquiry_email_trigger();
```

**Important:** Make sure the `pgsql-http` extension is enabled in your Supabase project:

```sql
CREATE EXTENSION IF NOT EXISTS http;
```

## Step 4: Verify Resend Sender Email (if not already done)

If you haven't already, verify your sender email `Bakirassociates@gmail.com` in Resend:

1. Go to [Resend Dashboard](https://resend.com)
2. Navigate to **Senders** or **From Addresses**
3. Look for `Bakirassociates@gmail.com` and verify it if not already verified
4. Check your email for verification link

## Step 5: Test the Setup

1. Go to your website contact form
2. Submit a test inquiry
3. Check:
   - Supabase database: The inquiry should appear in the `inquiries` table
   - Your email (`Bakirassociates@gmail.com`): You should receive the admin notification
   - The user's email (from form): They should receive the confirmation email

## Troubleshooting

**Emails not being sent?**
- Check Supabase Edge Function logs in the dashboard
- Verify the `RESEND_API_KEY` and `FROM_EMAIL` secrets are set correctly
- Ensure the `http` extension is enabled in your database
- Check that the Edge Function is deployed

**Function deployment failed?**
- Verify you're using the correct project ID: `syztrsherfhkpkwrrvxe`
- Check that Supabase CLI is installed and authenticated
- Review error messages in the deployment output

**Trigger not firing?**
- Run `SELECT * FROM pg_trigger WHERE tgname = 'inquiry_email_trigger';` to verify the trigger exists
- Check database logs for any trigger execution errors

## Edge Function Updates

The Edge Function (`supabase/functions/send-inquiry-email/index.ts`) now:
- Uses Resend API instead of SendGrid
- Reads `RESEND_API_KEY` and `FROM_EMAIL` from environment variables
- Sends two emails on each inquiry:
  1. **Admin Email**: Detailed inquiry information sent to `Bakirassociates@gmail.com`
  2. **User Email**: Confirmation email with company contact details
