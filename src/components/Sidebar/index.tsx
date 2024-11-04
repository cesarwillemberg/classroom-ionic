import React, { createContext, ReactNode } from 'react';
import './index.module.css';
import { IonList } from '@ionic/react';
// import Navbar from '../Navbar';

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
    expanded: boolean;
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    isFixed: boolean;
    setIsFixed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ children, expanded, setExpanded, isFixed, setIsFixed }: SidebarProps) {

    // const [expanded, setExpanded] = useState<boolean>(false);
    // const [isFixed, setIsFixed] = useState<boolean>(false);

    const handleMouseEnter = () => {
        if (!isFixed) setExpanded(true);
    };
    const handleMouseLeave = () => {
        if (!isFixed) setExpanded(false);
    };

    return (
        <SidebarContext.Provider value={{ expanded, setExpanded, isFixed, setIsFixed }}>
            <aside  
                className={`fixed top-16 left-0 transition-all ${expanded ? 'w-[19rem]' : 'w-[4.8rem]'} border-r border-solid border-gray-400`}
                style={{ height: `calc(100vh - 65px)`, zIndex: 1 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={!isFixed ? handleMouseLeave : undefined}
            >
                <div className={`h-full transition-all shadow-md bg-white`}>
                    <IonList className='flex-1 pt-5'>
                        {children}
                    </IonList>
                </div>
            </aside>
        </SidebarContext.Provider>
    );
}

export { SidebarContext };
