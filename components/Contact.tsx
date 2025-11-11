
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formMessage, setFormMessage] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setFormMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormMessage(t('formSuccess'));
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
        setFormMessage(data.error || t('formError'));
      }
    } catch (error) {
      setStatus('error');
      setFormMessage(t('formError'));
    }
  };


  return (
    <section id="contact" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-brand-accent uppercase mb-3">{t('contactTag')}</h2>
          <h3 className="text-5xl md:text-6xl font-serif font-bold text-brand-dark mb-4">
            {t('contactTitle')}
          </h3>
          <p className="text-base md:text-lg text-gray-600">
            {t('contactSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <h4 className="text-xl font-serif font-bold text-brand-dark mb-4">{t('contactDetailsTitle')}</h4>
            <div className="space-y-4 text-gray-700">
                <p><strong>{t('contactAddress')}</strong> {t('contactAddressValue')}</p>
                <p><strong>{t('contactPhone')}</strong> {t('contactPhoneValue')}</p>
                <p><strong>{t('contactEmail')}</strong> {t('contactEmailValue')}</p>
            </div>
            <h4 className="text-xl font-serif font-bold text-brand-dark mt-8 mb-4">{t('contactHoursTitle')}</h4>
            <div className="space-y-2 text-gray-700">
                <p><strong>{t('contactHours1')}</strong> {t('contactHours1Value')}</p>
                <p><strong>{t('contactHours2')}</strong> {t('contactHours2Value')}</p>
                <p><strong>{t('contactHours3')}</strong> {t('contactHours3Value')}</p>
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6">
                    <input 
                      type="text" 
                      placeholder={t('formName')}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-accent rtl:text-right"/>
                    <input
                      type="email"
                      placeholder={t('formEmail')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-accent rtl:text-right"/>
                    <textarea
                      placeholder={t('formMessage')}
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-accent rtl:text-right"></textarea>
                    
                    <div>
                      <button 
                        type="submit" 
                        disabled={status === 'submitting'}
                        className="bg-brand-dark text-white font-medium tracking-widest uppercase py-4 px-10 hover:bg-gray-800 transition-colors duration-300 disabled:bg-gray-400">
                        {status === 'submitting' ? t('formSubmitting') : t('formButton')}
                      </button>
                      {formMessage && (
                        <p className={`mt-4 text-sm ${status === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                          {formMessage}
                        </p>
                      )}
                    </div>
                </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
