import React, { useState } from 'react';
import Modal from '../Modal';

interface ModalParentPros {
    text?: string;
    icon?: JSX.Element;
    title?: string;
}

const ModalParent: React.FC<ModalParentPros> = ({ text, icon, title }: ModalParentPros) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button onClick={openModal} className="p-2 rounded" title={title}>
                {text ? text : icon }
            </button>
            <Modal isOpen={isOpen} onClose={closeModal} title={"Participar da turma"} subtitle={"Preecha os campos obrigatorios "} />
        </div>
    );
}; 

export default ModalParent;
