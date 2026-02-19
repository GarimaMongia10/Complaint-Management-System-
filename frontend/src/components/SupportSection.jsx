import React from 'react';
import { HelpCircle, Mail, Phone, MessageCircle, ExternalLink } from 'lucide-react';

const SupportSection = () => {
    const faqs = [
        { q: 'What is the average response time?', a: 'Our team typically reviews all new tickets within 4-6 business hours.' },
        { q: 'Can I track resolution milestones?', a: 'Yes, the "Resolution Analytics" section shows progress phases for each ticket.' },
    ];

    return (
        <section className="support-saas animated">
            <div className="support-grid-saas">
                <div className="card-saas faq-container-saas">
                    <div className="faq-header-saas">
                        <MessageCircle size={20} className="faq-icon" />
                        <h3>Help & FAQs</h3>
                    </div>
                    <div className="faq-list-saas">
                        {faqs.map((faq, i) => (
                            <div key={i} className="faq-row-saas">
                                <p className="faq-question-saas">{faq.q}</p>
                                <p className="faq-answer-saas">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="contact-card-saas">
                    <div className="contact-badge-saas">Expert Support Available</div>
                    <h3>Need Deep Assistance?</h3>
                    <p>Our dedicated support engineers are ready to help you resolve complex technical issues.</p>

                    <div className="contact-actions-saas">
                        <button className="btn btn-primary saas-full-btn">
                            <Mail size={16} /> Contact Support
                        </button>
                        <div className="contact-alt-saas">
                            <button className="alt-btn-saas"><Phone size={14} /> Call Now</button>
                            <button className="alt-btn-saas"><HelpCircle size={14} /> Docs</button>
                        </div>
                    </div>

                    <a href="#" className="visit-docs-saas">
                        Go to Documentation Site <ExternalLink size={14} />
                    </a>
                </div>
            </div>

            <style>{`
                .support-saas { margin-top: 3.5rem; padding-bottom: 5rem; }
                .support-grid-saas {
                    display: grid;
                    grid-template-columns: 1fr 360px;
                    gap: 1.5rem;
                }

                .faq-container-saas { padding: 2rem; }
                .faq-header-saas { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2rem; }
                .faq-header-saas h3 { font-size: 1.25rem; font-weight: 800; color: var(--text-main); }
                .faq-icon { color: var(--primary); }

                .faq-list-saas { display: flex; flex-direction: column; gap: 1.5rem; }
                .faq-question-saas { font-size: 0.9375rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.375rem; }
                .faq-answer-saas { font-size: 0.875rem; color: var(--text-muted); line-height: 1.6; }

                .contact-card-saas {
                    background: var(--primary);
                    background-image: linear-gradient(135deg, var(--primary), var(--primary-hover));
                    padding: 2.5rem 2rem;
                    border-radius: var(--radius-xl);
                    color: white;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    box-shadow: var(--shadow-lg);
                }
                .contact-badge-saas {
                    background: rgba(255, 255, 255, 0.15);
                    padding: 0.25rem 0.75rem;
                    border-radius: 99px;
                    font-size: 0.6875rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 1.25rem;
                }
                .contact-card-saas h3 { font-size: 1.5rem; font-weight: 800; margin-bottom: 0.75rem; }
                .contact-card-saas p { font-size: 0.875rem; opacity: 0.9; line-height: 1.6; margin-bottom: 2rem; }
                
                .contact-actions-saas { width: 100%; display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
                .saas-full-btn { width: 100%; background: white; color: var(--primary); }
                .saas-full-btn:hover { background: var(--bg-app); color: var(--primary-hover); transform: translateY(-3px); }
                
                .contact-alt-saas { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
                .alt-btn-saas {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.375rem;
                    padding: 0.5rem;
                    border-radius: var(--radius-md);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: white;
                }
                .alt-btn-saas:hover { background: rgba(255, 255, 255, 0.1); }
                
                .visit-docs-saas {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.8125rem;
                    font-weight: 700;
                    color: rgba(255, 255, 255, 0.8);
                }
                .visit-docs-saas:hover { color: white; }

                @media (max-width: 1024px) {
                    .support-grid-saas { grid-template-columns: 1fr; }
                }
            `}</style>
        </section>
    );
};

export default SupportSection;
