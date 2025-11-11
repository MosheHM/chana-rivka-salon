
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Validation Error', error: 'All fields are required.' });
    }
    
    // In a real application, you would send an email, save to a database, etc.
    console.log('Received contact form submission:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);

    res.status(200).json({ message: 'Message received successfully!' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
