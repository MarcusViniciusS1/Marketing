import React from 'react';
import { Outlet } from 'react-router-dom';

const LayoutLogin: React.FC = () => {
    return (
        <div className="d-flex justify-content-center align-items-center bg-primary" style={{ minHeight: '100vh' }}>
            <div className="card shadow-lg p-5" style={{ minWidth: '400px' }}>
                <div className="text-center mb-4">
                    <h1 className="fw-bold text-dark">Marketing App</h1>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default LayoutLogin;
