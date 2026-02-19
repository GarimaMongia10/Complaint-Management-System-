import React from 'react';
import { Link } from 'react-router-dom';
import ComplaintCard from './ComplaintCard';
import { ChevronRight, Zap } from 'lucide-react';

const RecentComplaints = ({ complaints }) => {
    const latestComplaints = complaints.slice(0, 3);

    return (
        <section className="recent-saas animated">
            <div className="section-header-saas">
                <div className="title-with-icon">
                    <Zap size={20} className="zap-icon" />
                    <h2>Recent Activities</h2>
                </div>
                <Link to="/complaints" className="saas-link">
                    View full history <ChevronRight size={16} />
                </Link>
            </div>

            {latestComplaints.length > 0 ? (
                <div className="recent-stack-saas">
                    {latestComplaints.map(complaint => (
                        <ComplaintCard key={complaint.id} complaint={complaint} />
                    ))}
                </div>
            ) : (
                <div className="empty-card-saas">
                    <p>No recent complaints found. Your latest submissions will appear here.</p>
                </div>
            )}

            <style>{`
                .recent-saas { margin-top: 3.5rem; }
                .title-with-icon { display: flex; align-items: center; gap: 0.75rem; }
                .title-with-icon h2 { font-size: 1.25rem; font-weight: 800; color: var(--text-main); }
                .zap-icon { color: var(--warning); }

                .saas-link {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    color: var(--primary);
                    font-size: 0.875rem;
                    font-weight: 700;
                }
                .saas-link:hover { text-decoration: underline; transform: translateX(3px); }

                .recent-stack-saas {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 1.5rem;
                    margin-top: 1.5rem;
                }

                .empty-card-saas {
                    background: white;
                    border: 1px solid var(--border-base);
                    border-radius: var(--radius-lg);
                    padding: 4rem 2rem;
                    text-align: center;
                    color: var(--text-muted);
                    margin-top: 1.5rem;
                    box-shadow: var(--shadow-sm);
                }
            `}</style>
        </section>
    );
};

export default RecentComplaints;
