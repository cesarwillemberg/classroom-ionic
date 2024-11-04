import React, { useContext } from "react";
import { SidebarContext } from "../Sidebar/index";
import { IonList, IonItem, IonLabel, IonRouterLink } from "@ionic/react";

interface SidebarItemProps {
    icon: JSX.Element;
    text: string;
    active?: boolean;
    alert?: boolean;
    src?: string;
    expanded: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, active, alert, src = "#", expanded }) => {
    
    // const context = useContext(SidebarContext);
    // if (!context) {
    //     throw new Error("SidebarItem must be used within a Sidebar");
    // }
    // const { expanded } = context;

    return (
        <IonRouterLink href={src} style={{ textDecoration: 'none' }}>
            <IonItem
                button
                className={`flex items-center ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-gray-300"}`}
            >
                {icon}
                <IonLabel className={`overflow-hidden text-sm transition-all ${expanded ? "ml-3" : "ml-0 opacity-0"}`} style={{ display: expanded ? '' : 'none' }} >
                    {text}
                </IonLabel>
                {/* {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}></div>} */}
            </IonItem>
        </IonRouterLink>
    );
};
