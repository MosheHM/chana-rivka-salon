import React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
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

const sectionTitleStyles = {
    fontFamily: '"Heebo", "Playfair Display", serif',
    color: '#402E32',
    fontSize: '20px',
    borderBottom: '2px solid #C4B7A6',
    paddingBottom: '5px',
    marginBottom: '15px',
};

const detailsListStyles = {
  listStyle: 'none',
  padding: 0,
  margin: '0 0 20px 0',
};

const messageBoxStyles = {
    whiteSpace: 'pre-wrap' as const,
    backgroundColor: '#f9f9f7',
    padding: '15px',
    borderRadius: '5px',
    border: '1px solid #e0e0e0',
    fontSize: '15px',
    lineHeight: '1.7',
};

export const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  name,
  email,
  message,
}) => (
  <div style={mainStyles}>
    <div style={containerStyles}>
      <div style={headerStyles}>
        <h1 style={headingStyles}>New Booking Inquiry</h1>
      </div>
      <div style={contentStyles}>
        <h2 style={sectionTitleStyles}>Client Details</h2>
        <ul style={detailsListStyles}>
          <li style={{ marginBottom: '10px' }}><strong>Name:</strong> {name}</li>
          <li><strong>Email:</strong> <a href={`mailto:${email}`} style={{ color: '#402E32', textDecoration: 'underline' }}>{email}</a></li>
        </ul>
        
        <h2 style={sectionTitleStyles}>Message</h2>
        <div style={messageBoxStyles}>
          {message}
        </div>
      </div>
    </div>
  </div>
);