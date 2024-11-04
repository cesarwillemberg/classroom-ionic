import './index.module.css';
import React from 'react';
import { IonList, IonItem } from '@ionic/react';

interface CardParentProps {
    children: React.ReactNode;
}

const CardParent: React.FC<CardParentProps> = ({ children }) => {
    return (
        <IonList className='flex flex-wrap pt-4'>
            {children}
        </IonList>
    );
}

export default CardParent;

