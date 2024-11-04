import React from 'react';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons } from '@ionic/react';
import FormNewClass from '../FormNewClass';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, subtitle }: ModalProps) => {
    
    const handleSubmit = (formData: any) => {
        console.log(formData);
        onClose(); // Close the modal after submitting
    };

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={onClose}>Cancelar</IonButton>
                    </IonButtons>
                    <IonTitle>{title}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="p-4">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">{title}</h3>
                    {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
                    <FormNewClass onSubmit={handleSubmit} onClose={onClose} />
                </div>
            </IonContent>
        </IonModal>
    );
};

export default Modal;
