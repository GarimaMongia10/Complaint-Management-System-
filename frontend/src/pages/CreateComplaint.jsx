import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ComplaintForm from '../components/ComplaintForm';
import Message from '../components/Message';
import { ChevronLeft, Info, Send, FileText } from 'lucide-react';
import { useComplaints } from '../context/ComplaintContext';

const CreateComplaint = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { addComplaint } = useComplaints();

    const handleSubmit = async (formData) => {
        setLoading(true);
        setError('');

        const result = await addComplaint({
            title: formData.title,
            description: formData.description,
            category: formData.category,
            priority: formData.priority || 'Low',
        });

        if (result.success) {
            navigate('/complaints');
        } else {
            setError(result.error || 'Failed to submit ticket. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="saas-form-page animated">
            <div className="container saas-narrow-container">
                <Link to="/dashboard" className="back-link-saas">
                    <ChevronLeft size={16} /> Back to Dashboard
                </Link>

                <header className="form-header-saas">
                    <div className="form-icon-wrap">
                        <FileText size={24} />
                    </div>
                    <h1>Create New Ticket</h1>
                    <p>Provide details about the issue you're experiencing for our team to review.</p>
                </header>

                {error && <Message type="danger">{error}</Message>}

                <div className="form-container-saas card-saas">
                    <div className="form-badge-saas">
                        <Info size={14} /> Priority Review Included
                    </div>

                    <ComplaintForm onSubmit={handleSubmit} loading={loading} />

                    <div className="form-footer-hint">
                        <p>Our average response time for new tickets is 4-6 hours. You will receive an email notification when your ticket status changes.</p>
                    </div>
                </div>
            </div>

            <style>{`
                .saas-form-page { padding: 4rem 0; min-height: calc(100vh - 80px); background: var(--bg-app); }
                .saas-narrow-container { max-width: 640px !important; }

                .back-link-saas {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text-muted);
                    font-size: 0.875rem;
                    font-weight: 700;
                    margin-bottom: 2.5rem;
                }
                .back-link-saas:hover { color: var(--primary); transform: translateX(-4px); }

                .form-header-saas { text-align: center; margin-bottom: 3rem; }
                .form-icon-wrap {
                    width: 56px;
                    height: 56px;
                    background: var(--primary-light);
                    color: var(--primary);
                    border-radius: var(--radius-lg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.1);
                }
                .form-header-saas h1 { font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.75rem; }
                .form-header-saas p { color: var(--text-muted); font-size: 1rem; line-height: 1.5; }

                .form-container-saas { padding: 3rem; background: white; border-radius: var(--radius-xl); }
                .form-badge-saas {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: var(--success-bg);
                    color: var(--success);
                    padding: 0.375rem 0.75rem;
                    border-radius: 99px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 2rem;
                }

                .form-footer-hint {
                    margin-top: 2.5rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid var(--border-subtle);
                }
                .form-footer-hint p { font-size: 0.8125rem; color: var(--text-muted); line-height: 1.6; font-style: italic; }

                @media (max-width: 640px) {
                    .form-container-saas { padding: 1.5rem; }
                }
            `}</style>
        </div>
    );
};

export default CreateComplaint;
