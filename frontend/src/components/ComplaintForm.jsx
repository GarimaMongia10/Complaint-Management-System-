import React, { useState, useEffect } from 'react';
import { Send, AlertCircle } from 'lucide-react';

const ComplaintForm = ({ initialData, onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'General',
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="complaint-form animated">
            <div className="form-group">
                <label className="form-label">Title</label>
                <input
                    type="text"
                    name="title"
                    className="form-input"
                    placeholder="Enter a brief title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Category</label>
                <select
                    name="category"
                    className="form-input"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="General">General</option>
                    <option value="Technical">Technical</option>
                    <option value="Billing">Billing</option>
                    <option value="Feedback">Feedback</option>
                </select>
            </div>

            <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                    name="description"
                    className="form-input"
                    placeholder="Describe your complaint in detail"
                    rows="5"
                    value={formData.description}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
                {loading ? 'Processing...' : (
                    <>
                        <Send size={18} />
                        {initialData ? 'Update Complaint' : 'Submit Complaint'}
                    </>
                )}
            </button>

            <style>{`
        .complaint-form {
          background: white;
          padding: 2rem;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          border: 1px solid var(--border);
        }
        textarea.form-input {
          resize: vertical;
        }
      `}</style>
        </form>
    );
};

export default ComplaintForm;
