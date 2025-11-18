
import React, { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Reveal from './Reveal';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: 'consultation',
    comment: ''
  });

  const [status, setStatus] = useState<FormStatus>('idle');
  const [formMessage, setFormMessage] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setFormMessage('');

    // Create a controller to abort the fetch if it takes too long
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal
      });

      clearTimeout(id);

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        // We don't reset the form status to idle anymore, we keep it at success
        // to show the success message permanently.
        setFormMessage(t('formSuccess'));
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: 'consultation',
          comment: ''
        });
        
      } else {
        setStatus('error');
        setFormMessage(data.error || t('formError'));
      }
    } catch (error: any) {
      clearTimeout(id);
      setStatus('error');
      if (error.name === 'AbortError') {
        setFormMessage(t('formError') || 'Request timed out. Please try again.');
      } else {
        setFormMessage(t('formError'));
      }
    }
  };


  return (
    <section id="contact" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal variant="slide-up">
            <h2 className="text-sm font-semibold tracking-widest text-brand-accent uppercase mb-3">{t('contactTag')}</h2>
            <h3 className="text-5xl md:text-6xl font-serif font-bold text-brand-dark mb-4">
              {t('contactTitle')}
            </h3>
          </Reveal>
          <Reveal variant="slide-up" delay={100}>
            <p className="text-base md:text-lg text-gray-600">
              {t('contactSubtitle')}
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <Reveal variant="slide-right" className="h-full">
            <div>
              <h4 className="text-xl font-serif font-bold text-brand-dark mb-4">{t('contactDetailsTitle')}</h4>
              <div className="space-y-4 text-gray-700">
                  <p><strong>{t('contactAddress')}</strong> {t('contactAddressValue')}</p>
                  <p><strong>{t('contactPhone')}</strong> {t('contactPhoneValue')}</p>
                  <p><strong>{t('contactEmail')}</strong> {t('contactEmailValue')}</p>
              </div>
            </div>
          </Reveal>
          <Reveal variant="slide-up" delay={200}>
            <div>
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-brand-bg/50 rounded-sm animate-fade-in">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4">{t('formSuccess')}</h3>
                    <p className="text-lg text-gray-600 font-medium">
                        {t('contactSuccessAmbition')}
                    </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input 
                        type="text" 
                        name="firstName"
                        placeholder={t('formFirstName')}
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-accent rtl:text-right"
                    />
                    <input 
                        type="text" 
                        name="lastName"
                        placeholder={t('formLastName')}
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-accent rtl:text-right"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="tel"
                        name="phone"
                        placeholder={t('formPhone')}
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-accent rtl:text-right"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder={t('formEmail')}
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-accent rtl:text-right"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2 rtl:text-right">
                        {t('formService')}
                    </label>
                    <select
                        name="service"
                        id="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-accent rtl:text-right bg-white"
                    >
                        <option value="curl-opening">{t('serviceCurlOpening')}</option>
                        <option value="organic-smoothing">{t('serviceOrganicSmoothing')}</option>
                        <option value="hair-repair">{t('serviceHairRepair')}</option>
                        <option value="coloring">{t('serviceColoring')}</option>
                        <option value="consultation">{t('serviceConsultation')}</option>
                        <option value="other">{t('serviceOther')}</option>
                    </select>
                  </div>
                  
                  <textarea
                    name="comment"
                    placeholder={t('formComment')}
                    rows={4}
                    value={formData.comment}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-accent rtl:text-right"
                  ></textarea>
                  
                  <div>
                    <button 
                      type="submit" 
                      disabled={status === 'submitting'}
                      className={`w-full md:w-auto font-medium tracking-widest uppercase py-4 px-10 transition-all duration-300 disabled:cursor-not-allowed
                        ${status === 'error' ? 'bg-red-600 text-white hover:bg-red-700' : 
                          'bg-brand-dark text-white hover:bg-gray-800 disabled:bg-gray-400'}
                      `}>
                      {status === 'submitting' ? t('formSubmitting') : t('formButton')}
                    </button>
                    {formMessage && (
                      <p className={`mt-4 text-sm ${status === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                        {formMessage}
                      </p>
                    )}
                  </div>
              </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
