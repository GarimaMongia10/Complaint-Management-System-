import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ComplaintForm from '../components/ComplaintForm';
import Message from '../components/Message';
import { ChevronLeft, Info, FileText } from 'lucide-react';
import { useComplaints } from '../context/ComplaintContext';

const EditComplaint = () => {
    const { id } = useParams();
    const { complaints, updateComplaint } = useComplaints();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [initialData, setInitialData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!complaints.length) return;
        const complaint = complaints.find(c => (c._id === id || c.id === id));
        if (complaint) {
            setInitialData({
                title: complaint.title,
                description: complaint.description,
                category: complaint.category,
                priority: complaint.priority || 'Low'
            });
        } else {
            setError('Complaint not found.');
        }
    }, [id, complaints]);

    const handleSubmit = async (formData) => {
        if (!initialData) return;
        setLoading(true);
        setError('');

        const result = await updateComplaint(id, formData);

        if (result.success) {
            navigate('/complaints');
        } else {
            setError(result.error || 'Failed to update ticket. Please try again.');
        }
        setLoading(false);
    };

    if (!initialData && !error) {
        return <div className="container" style={{ padding: '4rem 0' }}>Loading...</div>;
    }

    return (
        <div className="saas-form-page animated">
            <div className="container saas-narrow-container">
                <Link to="/complaints" className="back-link-saas">
                    <ChevronLeft size={16} /> Back to Tickets
                </Link>

                <header className="form-header-saas">
                    <div className="form-icon-wrap">
                        <FileText size={24} />
                    </div>
                    <h1>Update Ticket</h1>
                    {initialData && <p>Editing details for: <strong>{initialData.title}</strong></p>}
                </header>

                {error && <Message type="danger">{error}</Message>}

                {initialData && (
                    <div className="form-container-saas card-saas">
                        <div className="form-badge-saas">
                            <Info size={14} /> Update Review
                        </div>

                        <ComplaintForm initialData={initialData} onSubmit={handleSubmit} loading={loading} />
                    </div>
                )}
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
                    background: var(--info-bg, #eff6ff);
                    color: var(--info, #3b82f6);
                    padding: 0.375rem 0.75rem;
                    border-radius: 99px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 2rem;
                }

                @media (max-width: 640px) {
                    .form-container-saas { padding: 1.5rem; }
                }
            `}</style>
        </div>
    );
};

export default EditComplaint;
