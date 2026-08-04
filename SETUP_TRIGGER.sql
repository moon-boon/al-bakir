-- Enable http extension if not already enabled
CREATE EXTENSION IF NOT EXISTS http;

-- Create trigger function that calls the Edge Function
CREATE OR REPLACE FUNCTION public.on_inquiry_created()
RETURNS TRIGGER AS $$
DECLARE
  response record;
BEGIN
  -- Call the Edge Function with the new record data
  SELECT
    status,
    content
  INTO
    response
  FROM http_post(
    'https://syztrsherfhkpkwrrvxe.supabase.co/functions/v1/send-inquiry-email',
    jsonb_build_object(
      'record', to_jsonb(NEW)
    )::text,
    'application/json'
  ) AS response;

  RAISE LOG 'Edge Function called with status: %', response.status;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_inquiry_created_trigger ON public.inquiries;

-- Create trigger
CREATE TRIGGER on_inquiry_created_trigger
AFTER INSERT ON public.inquiries
FOR EACH ROW
EXECUTE FUNCTION public.on_inquiry_created();
