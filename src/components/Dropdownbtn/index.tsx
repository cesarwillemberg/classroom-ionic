import React, { useContext, useState } from 'react';
import { SidebarContext } from "../Sidebar/index";
import { IonItem, IonLabel, IonList, IonButton, IonToggle } from '@ionic/react';

interface DropdownProps {
    children: React.ReactNode;
    label: string;
    icon: JSX.Element;
    border?: string;
    expanded: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ children, label, icon, border,  expanded }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    // const context = useContext(SidebarContext);

    // if (!context) {
    //     throw new Error("Dropdown must be used within a Sidebar");
    // }

    // const { expanded } = context;

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className={`relative ${border} w-full`}>
            <IonItem 
                className={`flex items-center ${isOpen ? "bg-gray-200" : ""} -ml-5`}   
                onClick={toggleDropdown}
            >
                <svg 
                    className={`w-5 h-5  transition-transform ${isOpen && expanded ? 'rotate-90' : ''} m-0`} 
                    viewBox="0 0 24 24" 
                    style={{ fill: 'white' }} 
                    >
                    <path d="M10 17l5-5-5-5v10z" fill="white" />
                </svg>
                {icon}
                <IonLabel className={`overflow-hidden text-sm transition-transform ${expanded ? 'ml-3' : ' ml-0 opacity-0'}`} style={{ display: expanded ? '' : 'none' }} >
                    {label}
                </IonLabel>
            </IonItem>
            {isOpen && expanded && (
                <IonList>
                    <div className="rounded-md bg-white">
                        {children}
                    </div>
                </IonList>
            )}
        </div>
    );
};

export default Dropdown;
