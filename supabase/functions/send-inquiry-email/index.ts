import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "onboarding@resend.dev";
const ADMIN_EMAILS = ["Bakirassociates@gmail.com", "akhtargondal9696@gmail.com", "jabbarahmad557788@gmail.com", "reyaanwarraich@gmail.com"];

serve(async (req) => {
  console.log("Function invoked, method:", req.method);
  console.log("RESEND_API_KEY exists:", !!RESEND_API_KEY);
  console.log("FROM_EMAIL:", FROM_EMAIL);

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const payload = await req.json();
    console.log("Payload received:", JSON.stringify(payload));
    const { record } = payload;

    if (!record) {
      console.log("No record in payload");
      return new Response(JSON.stringify({ error: "No record data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { name, email, phone, project_type, message, created_at } = record;
    console.log("Processing inquiry for:", email);

    // Send email to all admin emails
    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: ADMIN_EMAILS,
        subject: `New Inquiry: ${project_type} - ${name}`,
        reply_to: email,
        html: `
          <h2>New Inquiry Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Project Type:</strong> ${project_type}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <p><strong>Submitted at:</strong> ${new Date(created_at).toLocaleString()}</p>
          <hr>
          <p><a href="https://supabase.com/dashboard">View in Dashboard</a></p>
        `,
      }),
    });

    if (!adminEmailResponse.ok) {
      const error = await adminEmailResponse.text();
      console.error("SendGrid admin email error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to send admin email", details: error }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Send confirmation email to user
    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email,
        subject: "Thank you for your inquiry - Al Bakir",
        html: `
          <p>Dear ${name.split(" ")[0]},</p>
          <p>Thank you for reaching out to Al Bakir. We have received your inquiry regarding ${project_type.toLowerCase()} and will get back to you within 24 hours.</p>
          <p><strong>Your project details:</strong></p>
          <ul>
            <li>Project Type: ${project_type}</li>
            <li>Contact: ${phone || "Email only"}</li>
          </ul>
          <p>If you have any urgent matters, please call us at:</p>
          <ul>
            <li>Landline: 051 2765184</li>
            <li>Primary: +92 334 7402123</li>
            <li>Secondary: +92 333 5116302</li>
          </ul>
          <p>Best regards,<br>Al Bakir Pvt Ltd<br>Multi Gardens B-17, Islamabad</p>
        `,
      }),
    });

    if (!userEmailResponse.ok) {
      const error = await userEmailResponse.text();
      console.error("Resend user email error:", error);
      // Don't fail the whole function if user email fails
      console.log("Warning: User confirmation email failed, but inquiry was saved");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});
