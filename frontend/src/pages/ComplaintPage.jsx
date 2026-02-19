import React, { useState } from 'react';
import ComplaintList from '../components/ComplaintList';
import Message from '../components/Message';
import { Search, Plus, Filter, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useComplaints } from '../context/ComplaintContext';

const ComplaintPage = () => {
    const { complaints, deleteComplaint, updateComplaintStatus } = useComplaints();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredComplaints = complaints.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to resolve and remove this ticket?')) {
            deleteComplaint(id);
        }
    };

    const handleEdit = (complaint) => {
        console.log('Editing complaint:', complaint);
        alert('Edit functionality would move to an edit form here.');
    };

    return (
        <div className="saas-page-wrapper animated">
            <div className="container">
                <header className="saas-page-header">
                    <div className="header-text">
                        <h1>Issue Management</h1>
                        <p>Detailed view of all your submitted tickets and their statuses.</p>
                    </div>
                    <Link to="/create-complaint" className="btn btn-primary saas-btn-elevated">
                        <Plus size={18} /> New Ticket
                    </Link>
                </header>

                <div className="saas-filter-controls card-saas">
                    <div className="search-box-saas">
                        <Search size={18} className="search-icon-saas" />
                        <input
                            type="text"
                            placeholder="Filter by ticket title, description..."
                            className="saas-search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="filter-group-saas">
                        <div className="filter-label-group">
                            <SlidersHorizontal size={14} className="filter-icon" />
                            <label>Status</label>
                        </div>
                        <select
                            className="saas-filter-select"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                </div>

                <div className="saas-result-meta">
                    <p>Showing <strong>{filteredComplaints.length}</strong> active tickets</p>
                </div>

                <div className="saas-list-container">
                    <ComplaintList
                        complaints={filteredComplaints}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onStatusUpdate={updateComplaintStatus}
                    />
                </div>
            </div>

            <style>{`
                .saas-page-wrapper { padding: 4rem 0; min-height: calc(100vh - 80px); background: var(--bg-app); }
                .saas-page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; }
                .saas-page-header h1 { font-size: 2.25rem; font-weight: 800; color: var(--text-main); line-height: 1; letter-spacing: -0.025em; }
                .saas-page-header p { color: var(--text-muted); font-size: 1rem; margin-top: 0.75rem; }

                .saas-btn-elevated { padding: 0.75rem 1.5rem; box-shadow: var(--shadow-md); }
                .saas-btn-elevated:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }

                .saas-filter-controls {
                    display: grid;
                    grid-template-columns: 1fr auto;
                    gap: 2rem;
                    padding: 1.25rem 2rem;
                    margin-bottom: 1.5rem;
                    align-items: center;
                }
                .search-box-saas { position: relative; display: flex; align-items: center; }
                .search-icon-saas { position: absolute; left: 1rem; color: var(--text-light); }
                .saas-search-input {
                    width: 100%;
                    padding: 0.75rem 1rem 0.75rem 3rem;
                    border: 1px solid var(--border-base);
                    border-radius: var(--radius-md);
                    font-size: 0.875rem;
                    outline: none;
                    background: var(--bg-app);
                    transition: var(--transition);
                }
                .saas-search-input:focus { background: white; border-color: var(--primary); box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1); }

                .filter-group-saas { display: flex; align-items: center; gap: 1.25rem; }
                .filter-label-group { display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); }
                .filter-label-group label { font-size: 0.8125rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
                .filter-icon { color: var(--text-light); }
                
                .saas-filter-select {
                    padding: 0.625rem 2.5rem 0.625rem 1rem;
                    border-radius: var(--radius-md);
                    border: 1px solid var(--border-base);
                    font-size: 0.8125rem;
                    font-weight: 700;
                    background: white;
                    color: var(--text-main);
                    outline: none;
                    cursor: pointer;
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23475569' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 0.75rem center;
                    background-size: 0.875rem;
                }
                .saas-filter-select:hover { border-color: var(--secondary); }

                .saas-result-meta { margin-bottom: 2rem; padding: 0 0.5rem; }
                .saas-result-meta p { font-size: 0.875rem; color: var(--text-muted); }
                .saas-result-meta strong { color: var(--text-main); }

                .saas-list-container { margin-top: 1rem; }

                @media (max-width: 992px) {
                    .saas-filter-controls { grid-template-columns: 1fr; gap: 1.5rem; }
                    .filter-group-saas { justify-content: space-between; }
                }
            `}</style>
        </div>
    );
};

export default ComplaintPage;
