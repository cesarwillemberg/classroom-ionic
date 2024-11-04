import React, { createContext, useState, ReactNode } from 'react';
import './index.module.css';
import Navbar from '../Navbar';

// Define the context type
interface SidebarContextType {
    expanded: boolean;
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    isFixed: boolean;
    setIsFixed: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the SidebarContext
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProps {
    children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [isFixed, setIsFixed] = useState<boolean>(false);

    const handleMouseEnter = () => {
        if (!isFixed) setExpanded(true);
    };

    const handleMouseLeave = () => {
        if (!isFixed) setExpanded(false);
    };

    const toggleSidebar = () => {
        setIsFixed(prev => !prev);
        setExpanded(prev => !prev);
    }

    return (
        <SidebarContext.Provider value={{ expanded, setExpanded, isFixed, setIsFixed }}>
            <Navbar toggleSidebar={toggleSidebar} />
            <aside 
                className={`fixed top-16 left-0 transition-all ${expanded ? 'w-[19rem]' : 'w-[4.8rem]'} border-r border-solid border-gray-400`}
                style={{ height: `calc(100vh - 64px)`}} 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={!isFixed ? handleMouseLeave : undefined}
            >
                <div className={`h-full transition-all shadow-md bg-white`}>
                    <ul className='flex-1 pt-5'>
                        {children}
                    </ul>
                </div>
            </aside>
        </SidebarContext.Provider>
    );
}

export { SidebarContext };
