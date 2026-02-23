import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const ComplaintContext = createContext(null);

export const ComplaintProvider = ({ children }) => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchComplaints = async () => {
        const token = localStorage.getItem('token');
        if (!token) return; // Don't attempt if not logged in
        setLoading(true);
        try {
            const response = await api.get('/complaint/all');
            setComplaints(response.data);
        } catch (error) {
            console.error('Error fetching complaints:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    const addComplaint = async (newComplaint) => {
        setLoading(true);
        try {
            const { data } = await api.post('/complaint/create', newComplaint);
            // Re-fetch so we have the real _id from MongoDB
            await fetchComplaints();
            return { success: true };
        } catch (error) {
            console.error('Error adding complaint:', error);
            const msg = error.response?.data?.error || error.response?.data?.message || 'Failed to submit complaint';
            return { success: false, error: msg };
        } finally {
            setLoading(false);
        }
    };

    const updateComplaintStatus = async (id, newStatus) => {
        try {
            await api.put(`/complaint/${id}`, { status: newStatus });
            setComplaints(prev => prev.map(c => (c._id === id || c.id === id) ? { ...c, status: newStatus } : c));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const updateComplaint = async (id, updatedData) => {
        setLoading(true);
        try {
            await api.put(`/complaint/${id}`, updatedData);
            await fetchComplaints();
            return { success: true };
        } catch (error) {
            console.error('Error updating complaint:', error);
            const msg = error.response?.data?.error || error.response?.data?.message || 'Failed to update complaint';
            return { success: false, error: msg };
        } finally {
            setLoading(false);
        }
    };

    const deleteComplaint = async (id) => {
        try {
            await api.delete(`/complaint/${id}`);
            setComplaints(prev => prev.filter(c => c._id !== id && c.id !== id));
        } catch (error) {
            console.error('Error deleting complaint:', error);
        }
    };

    return (
        <ComplaintContext.Provider value={{
            complaints,
            loading,
            addComplaint,
            fetchComplaints,
            updateComplaintStatus,
            updateComplaint,
            deleteComplaint
        }}>
            {children}
        </ComplaintContext.Provider>
    );
};

export const useComplaints = () => useContext(ComplaintContext);
