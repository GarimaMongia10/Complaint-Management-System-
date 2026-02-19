import React from 'react';

const Message = ({ type = 'info', children }) => {
    const styles = {
        padding: '1rem',
        borderRadius: '0.5rem',
        marginBottom: '1rem',
        fontWeight: '500',
        fontSize: '0.925rem',
    };

    const types = {
        info: { bg: '#e0f2fe', color: '#0369a1' },
        success: { bg: '#dcfce7', color: '#166534' },
        danger: { bg: '#fee2e2', color: '#991b1b' },
        warning: { bg: '#fef3c7', color: '#92400e' },
    };

    const currentStyle = types[type] || types.info;

    return (
        <div style={{ ...styles, backgroundColor: currentStyle.bg, color: currentStyle.color }}>
            {children}
        </div>
    );
};

export default Message;
