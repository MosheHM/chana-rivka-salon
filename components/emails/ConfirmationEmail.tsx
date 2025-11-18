import React from 'react';

interface ConfirmationEmailProps {
  name: string;
}

const mainStyles = {
  fontFamily: '"Assistant", "Montserrat", sans-serif',
  lineHeight: '1.6',
  backgroundColor: '#F9F9F7',
  color: '#2C2C2C',
  padding: '40px 20px',
};

const containerStyles = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  overflow: 'hidden',
};

const headerStyles = {
  backgroundColor: '#402E32',
  padding: '20px',
  textAlign: 'center' as const,
};

const headingStyles = {
  color: '#ffffff',
  margin: 0,
  fontFamily: '"Heebo", "Playfair Display", serif',
  fontSize: '24px',
};

const contentStyles = {
  padding: '30px',
};

const paragraphStyles = {
  margin: '0 0 15px 0',
  fontSize: '16px',
};

const footerStyles = {
  textAlign: 'center' as const,
  padding: '20px',
  fontSize: '12px',
  color: '#777777',
};

export const ConfirmationEmail: React.FC<Readonly<ConfirmationEmailProps>> = ({
  name,
}) => (
  <div style={mainStyles}>
    <div style={containerStyles}>
      <div style={headerStyles}>
        <h1 style={headingStyles}>CHANA RIVKA</h1>
      </div>
      <div style={contentStyles}>
        <h2 style={{ fontFamily: '"Heebo", "Playfair Display", serif', color: '#402E32', fontSize: '20px' }}>
          Thank you for getting in touch, {name}!
        </h2>
        <p style={paragraphStyles}>
          We have successfully received your message. A member of our team will review it and get back to you as soon as possible.
        </p>
        <p style={paragraphStyles}>
          We look forward to welcoming you to the salon.
        </p>
        <br />
        <p style={paragraphStyles}>
          Warm regards,<br />
          <strong>The Chana Rivka Hair Salon Team</strong>
        </p>
      </div>
      <div style={footerStyles}>
        <p>&copy; {new Date().getFullYear()} CHANA RIVKA. All Rights Reserved.</p>
        <p>123 Beauty Lane, Style City, 10001</p>
      </div>
    </div>
  </div>
);