import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const ComplaintContext = createContext(null);

export const ComplaintProvider = ({ children }) => {
    const [complaints, setComplaints] = useState([
        { id: '1', title: 'Slow Internet Connection', description: 'The internet speed is much lower than promised in the plan.', status: 'Pending', category: 'Technical', date: '2026-02-15' },
        { id: '2', title: 'Double Billing Error', description: 'I have been charged twice for the month of January.', status: 'In Progress', category: 'Billing', date: '2026-02-16' },
        { id: '3', title: 'App Crashing on Startup', description: 'The mobile app crashes every time I try to open it on iOS.', status: 'Resolved', category: 'Technical', date: '2026-02-14' },
        { id: '4', title: 'Feature Request: Dark Mode', description: 'It would be great if the dashboard had a dark mode option.', status: 'Closed', category: 'Feedback', date: '2026-02-10' },
    ]);
    const [loading, setLoading] = useState(false);

    const fetchComplaints = async () => {
        setLoading(true);
        try {
            // In a real app: const response = await api.get('/complaints'); setComplaints(response.data);
            // For now, we use the local state which persists as long as the app is running
        } catch (error) {
            console.error('Error fetching complaints:', error);
        } finally {
            setLoading(false);
        }
    };

    const addComplaint = async (newComplaint) => {
        setLoading(true);
        try {
            // Mock API call: await api.post('/complaints', newComplaint);
            const complaintWithId = {
                ...newComplaint,
                id: Date.now().toString(),
                status: 'Pending',
                date: new Date().toISOString(),
            };

            setComplaints(prev => [complaintWithId, ...prev]);
            return { success: true };
        } catch (error) {
            console.error('Error adding complaint:', error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    const updateComplaintStatus = (id, newStatus) => {
        setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    };

    const deleteComplaint = (id) => {
        setComplaints(prev => prev.filter(c => c.id !== id));
    };

    return (
        <ComplaintContext.Provider value={{
            complaints,
            loading,
            addComplaint,
            fetchComplaints,
            updateComplaintStatus,
            deleteComplaint
        }}>
            {children}
        </ComplaintContext.Provider>
    );
};

export const useComplaints = () => useContext(ComplaintContext);
