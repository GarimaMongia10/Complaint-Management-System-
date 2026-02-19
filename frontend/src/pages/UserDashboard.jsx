import React, { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useComplaints } from '../context/ComplaintContext';
import { ClipboardList, Clock, CheckCircle } from 'lucide-react';

// Sub-components
import DashboardStats from '../components/DashboardStats';
import RecentComplaints from '../components/RecentComplaints';
import DashboardAnalytics from '../components/DashboardAnalytics';
import ActivityTimeline from '../components/ActivityTimeline';
import SupportSection from '../components/SupportSection';

const UserDashboard = () => {
    const { user } = useAuth();
    const { complaints } = useComplaints();

    const stats = useMemo(() => [
        { label: 'Total Tickets', value: complaints.length, icon: <ClipboardList size={22} />, color: '#4f46e5' },
        { label: 'Pending', value: complaints.filter(c => c.status === 'Pending').length, icon: <Clock size={22} />, color: '#f59e0b' },
        { label: 'Resolved', value: complaints.filter(c => c.status === 'Resolved').length, icon: <CheckCircle size={22} />, color: '#10b981' },
    ], [complaints]);

    return (
        <div className="saas-dashboard-wrapper">
            <div className="container saas-dashboard-container">
                <DashboardStats stats={stats} />

                <div className="saas-main-grid">
                    <div className="saas-primary-col">
                        <RecentComplaints complaints={complaints} />
                        <DashboardAnalytics complaints={complaints} />
                    </div>

                    <aside className="saas-secondary-col">
                        <ActivityTimeline />
                        <div className="cta-sidebar-saas animated" style={{ animationDelay: '0.2s' }}>
                            <div className="cta-icon-saas">🚀</div>
                            <h4>Upgrade to Pro</h4>
                            <p>Get priority support, advanced analytics, and custom ticket categories.</p>
                            <button className="btn btn-primary saas-btn-wide">Learn More</button>
                        </div>
                    </aside>
                </div>

                <SupportSection />
            </div>

            <style>{`
                .saas-dashboard-wrapper {
                    padding: 3.5rem 0;
                    background: var(--bg-app);
                    min-height: calc(100vh - 80px);
                }
                .saas-dashboard-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .saas-main-grid {
                    display: grid;
                    grid-template-columns: 1fr 360px;
                    gap: 2.5rem;
                    align-items: flex-start;
                    margin-top: 1rem;
                }
                .saas-primary-col {
                    display: flex;
                    flex-direction: column;
                }
                .saas-secondary-col {
                    display: flex;
                    flex-direction: column;
                    gap: 2.5rem;
                    position: sticky;
                    top: 100px;
                }
                
                .cta-sidebar-saas {
                    background: white;
                    border: 1px solid var(--border-base);
                    border-radius: var(--radius-xl);
                    padding: 2rem 1.5rem;
                    text-align: center;
                    box-shadow: var(--shadow-sm);
                    transition: var(--transition);
                }
                .cta-sidebar-saas:hover {
                    box-shadow: var(--shadow-md);
                    transform: scale(1.02);
                }
                .cta-icon-saas { font-size: 2.5rem; margin-bottom: 1rem; }
                .cta-sidebar-saas h4 { font-size: 1.125rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem; }
                .cta-sidebar-saas p { font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.5; }
                .saas-btn-wide { width: 100%; border-radius: var(--radius-md); padding: 0.75rem; }

                @media (max-width: 1100px) {
                    .saas-main-grid { grid-template-columns: 1fr; }
                    .saas-secondary-col { position: static; order: 2; }
                    .saas-primary-col { order: 1; }
                }
            `}</style>
        </div>
    );
};

export default UserDashboard;
