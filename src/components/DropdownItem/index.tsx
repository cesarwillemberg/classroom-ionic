import React from 'react';
import { IonItem, IonLabel, IonRouterLink } from '@ionic/react';

interface DropdownItemProps {
    text: string;
    icon?: JSX.Element;
    src?: string;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ text, icon, src = "#" }) => {
    return (
        <IonRouterLink href={src} style={{ textDecoration: 'none' }}>
            <IonItem button className="flex items-center text-white">
                {icon}
                <IonLabel className="ml-2 text-sm">{text}</IonLabel>
            </IonItem>
        </IonRouterLink>
    );
};

export default DropdownItem;
