import React from 'react';
import ComplaintCard from './ComplaintCard';
import { ClipboardList } from 'lucide-react';

const ComplaintList = ({ complaints, onEdit, onDelete, isAdmin = false, onStatusUpdate }) => {
    if (!complaints || complaints.length === 0) {
        return (
            <div className="empty-state-saas animated">
                <div className="empty-icon-wrapper">
                    <ClipboardList size={56} />
                </div>
                <h3>No reports yet</h3>
                <p>Submit a new complaint to start tracking its resolution progress.</p>
            </div>
        );
    }

    return (
        <div className="complaints-grid-saas">
            {complaints.map((complaint) => (
                <ComplaintCard
                    key={complaint.id}
                    complaint={complaint}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isAdmin={isAdmin}
                    onStatusUpdate={onStatusUpdate}
                />
            ))}
            <style>{`
                .complaints-grid-saas {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 1.5rem;
                }
                .empty-state-saas {
                    text-align: center;
                    padding: 6rem 2rem;
                    background: white;
                    border-radius: var(--radius-xl);
                    border: 2px dashed var(--border-base);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .empty-icon-wrapper {
                    color: var(--text-light);
                    margin-bottom: 1.5rem;
                    background: var(--bg-app);
                    padding: 1.5rem;
                    border-radius: 50%;
                }
                .empty-state-saas h3 { color: var(--text-main); font-weight: 800; margin-bottom: 0.5rem; }
                .empty-state-saas p { color: var(--text-muted); font-size: 0.9375rem; max-width: 320px; }

                @media (max-width: 640px) {
                    .complaints-grid-saas { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
};

export default ComplaintList;
