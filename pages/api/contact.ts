
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

// Initialized with the existing key to ensure functionality
const resend = new Resend('re_ZunohsSm_Pp3rUCebkzntTofbegnEHkws');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const body = req.body;
    const { firstName, lastName, phone, email, service, comment } = body;

    const serviceNames: { [key: string]: string } = {
      "curl-opening": "פתיחת תלתלים",
      "organic-smoothing": "החלקה אורגנית",
      "root-straightening": "החלקת שורשים",
      consultation: "יעוץ",
      other: "אחר",
    };

    const emailContent = `
  <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #57534e; border-bottom: 2px solid #d6d3d1; padding-bottom: 10px;">
      פנייה חדשה מהאתר - חנה רבקה
    </h2>
    
    <div style="background-color: #f5f5f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #44403c; margin-top: 0;">פרטי הלקוח:</h3>
      <p><strong>שם:</strong> ${firstName} ${lastName}</p>
      <p><strong>טלפון:</strong> ${phone}</p>
      ${email ? `<p><strong>אימייל:</strong> ${email}</p>` : ""}
      <p><strong>שירות מבוקש:</strong> ${serviceNames[service] || service}</p>
      ${comment ? `<p><strong>הערות:</strong><br>${comment}</p>` : ""}
    </div>
    
    <div style="background-color: #e7e5e4; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <h4 style="color: #44403c; margin-top: 0;">פרטי הסלון:</h4>
      <p><strong>כתובת:</strong> רחוב ביל"ו בני ברק</p>
      <p><strong>טלפון:</strong> 054-8499287</p>
      <p><strong>WhatsApp:</strong> 054-8499287</p>
      <p><strong>אימייל:</strong> crmakias123@gmail.com</p>
    </div>
    
    <p style="color: #78716c; font-size: 14px;">
      הודעה זו נשלחה מטופס יצירת הקשר באתר חנה רבקה - רחוב ביל"ו בני ברק
    </p>
  </div>
`;

    const data = await resend.emails.send({
      from: "Chana Rivka Salon <noreply@chanarivkabeauty.co.il>",
      to: ["chana.hair@chanarivkabeauty.co.il"],
      subject: `פנייה חדשה מ${firstName} ${lastName}`,
      html: emailContent,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
