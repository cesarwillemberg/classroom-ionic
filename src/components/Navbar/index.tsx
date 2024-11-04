import React, { useContext } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonImg } from '@ionic/react';
import { AlignJustify, CircleUserRound, Grip, Plus } from 'lucide-react';
import { SidebarContext } from '../Sidebar';
import ModalParent from '../ModalParent';

interface NavbarProps {
    toggleSidebar?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
    
    // const context = useContext(SidebarContext);
    // if (!context) {
    //     throw new Error("Navbar must be used within a SidebarProvider");
    // }

    return (
        <IonHeader>
            <IonToolbar className="border-b border-gray-400 bg-white z-50">
                <IonButtons slot="start" className='ml-3'>
                    <IonButton onClick={toggleSidebar} aria-label="Toggle Menu" title='Menu Principal' fill="clear">
                        <AlignJustify size={22} />
                    </IonButton>
                    <IonImg src="/logo.svg" alt="classroom_logo" style={{ width: '30px', height: '30px' }} className='ml-5 mr-5' />
                    <IonTitle className="text-colorText1 text-xl px-2 hover:underline hover:text-green-700">
                        Google Sala de Aula
                    </IonTitle>
                </IonButtons>
                <IonButtons slot="end" className="space-x-5">
                    <ModalParent icon={<Plus size={32} />} title={"Participar de uma turma"} />
                    <IonButton aria-label="Google Apps" title="Google Apps" fill="clear">
                        <Grip size={30} />
                    </IonButton>
                    <IonButton aria-label="Google Accounts" fill="clear">
                        <CircleUserRound size={32} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    );
};

export default Navbar;
