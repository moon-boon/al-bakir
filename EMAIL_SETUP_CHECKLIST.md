# Email Setup Completion Checklist

## ✅ Completed Steps

- [x] Created/obtained Resend API Key: `re_35qaMVpz_9uPW89ugkhYTv66dmdxTF7YL`
- [x] Verified sender email: `Bakirassociates@gmail.com` in Resend
- [x] Updated Edge Function (`supabase/functions/send-inquiry-email/index.ts`) to use Resend API
- [x] Form submission logic already implemented in `src/lib/supabase.ts`
- [x] Database table and RLS policy already configured in Supabase

## ⏳ Remaining Steps (for you to complete)

### 1. Add Resend Secrets to Supabase
- [ ] Go to https://supabase.com/dashboard
- [ ] Navigate to your al-bakir-copy project
- [ ] Go to **Settings → Edge Functions → Secrets**
- [ ] Add these two secrets:
  - Name: `RESEND_API_KEY` → Value: `re_35qaMVpz_9uPW89ugkhYTv66dmdxTF7YL`
  - Name: `FROM_EMAIL` → Value: `Bakirassociates@gmail.com`

### 2. Enable the `http` Extension in Database
- [ ] Go to **SQL Editor** in Supabase
- [ ] Run this command:
  ```sql
  CREATE EXTENSION IF NOT EXISTS http;
  ```

### 3. Create the Database Trigger
- [ ] Go to **SQL Editor** in Supabase
- [ ] Copy and run all the SQL from `RESEND_SETUP.md` (Step 3 section)
  - This creates the trigger function that calls the Edge Function when inquiries are submitted

### 4. Deploy the Updated Edge Function
- [ ] Open terminal in project directory
- [ ] Run one of these commands:

**Option A: Using Supabase CLI**
```bash
supabase functions deploy send-inquiry-email --project-id syztrsherfhkpkwrrvxe
```

**Option B: Using Vercel (if project is on Vercel)**
```bash
vercel deploy
```

### 5. Test the Complete Flow
- [ ] Go to your website contact form
- [ ] Submit a test inquiry with:
  - Name: Test Name
  - Email: your-email@example.com
  - Phone: (optional)
  - Project Type: Select one
  - Message: Test message
- [ ] Verify:
  - Data appears in Supabase database (`inquiries` table)
  - You receive admin email at `Bakirassociates@gmail.com`
  - Test email address receives confirmation email

## 📧 Email Flow After Setup

When someone submits the contact form:

1. **Frontend** → Form data sent to Supabase via `submitInquiry()` function
2. **Supabase** → Data saved to `inquiries` table
3. **Database Trigger** → Automatically detects new row and calls Edge Function
4. **Edge Function** → Calls Resend API with inquiry details
5. **Resend** → Sends two emails:
   - Admin email to `Bakirassociates@gmail.com` with full inquiry details
   - Confirmation email to the user with company contact info

## 🔍 Project Information

- **Supabase Project ID**: `syztrsherfhkpkwrrvxe`
- **Edge Function Name**: `send-inquiry-email`
- **Database Table**: `inquiries`
- **Admin Email**: `Bakirassociates@gmail.com`
- **Sender Email**: `Bakirassociates@gmail.com`

## 🆘 Need Help?

Refer to `RESEND_SETUP.md` for detailed instructions and troubleshooting guide.

The complete setup should take about 5-10 minutes to complete!
