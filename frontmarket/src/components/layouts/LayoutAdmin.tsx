import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
// Caminhos de importação corrigidos para minúsculas
import Header from '../header'; 
import Sidebar from '../sidebar';

const LayoutAdmin: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="d-flex">
            {/* A prop onToggleSidebar foi adicionada ao Sidebar aqui */}
            <Sidebar isOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
            <div 
                className="flex-grow-1 d-flex flex-column" 
                style={{ 
                    minHeight: '100vh', 
                    marginLeft: isSidebarOpen ? '280px' : '0',
                    transition: 'margin-left 0.3s ease-in-out'
                }}
            >
                <Header onToggleSidebar={toggleSidebar} />
                <main className="p-4 flex-grow-1 bg-light">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default LayoutAdmin;