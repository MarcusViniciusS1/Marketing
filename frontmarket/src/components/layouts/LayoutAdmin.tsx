import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';

const LayoutAdmin: React.FC = () => {
    // Estado para controlar a visibilidade do sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Função para alternar o estado do sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="d-flex">
            <Sidebar isOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
            <div className={`flex-grow-1 d-flex flex-column transition-all`} style={{ minHeight: '100vh', marginLeft: isSidebarOpen ? '280px' : '0' }}>
                <Header onToggleSidebar={toggleSidebar} />
                <main className="p-4 flex-grow-1 bg-light">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default LayoutAdmin;
