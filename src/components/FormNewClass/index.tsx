import { useState } from 'react';
import {
    IonButton,
    IonContent,
    IonInput,
    IonLabel,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonToast,
    IonItem,
} from '@ionic/react';
import { IonInputCustomEvent, InputChangeEventDetail } from '@ionic/core'; // Importando tipos

interface ClassFormProps {
    onSubmit: (classData: ClassData) => void;
    onClose: () => void;
}

interface ClassData {
    nameClass: string;
    group: string;
    professorName: string;
}

const FormNewClass: React.FC<ClassFormProps> = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState<ClassData>({
        nameClass: '',
        group: '',
        professorName: '',
    });

    const [imageProfile, setImageProfile] = useState<File | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleChange = (event: IonInputCustomEvent<InputChangeEventDetail>) => {
        const { value } = event.detail;
        const inputId = event.target.id;

        setFormData((prevState) => ({
            ...prevState,
            [inputId]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImageProfile(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('nameClass', formData.nameClass);
        formDataToSend.append('group', formData.group);
        formDataToSend.append('professorName', formData.professorName);
        if (imageProfile) {
            formDataToSend.append('imageProfile', imageProfile);
        }

        try {
            const apiUrl = process.env.REACT_APP_API_URL || 'http://200.132.192.203:3000/';
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formDataToSend,
            }).then((response) => response.json());

            if (response.created) {
                setToastMessage("Turma criada com sucesso!");
                setShowToast(true);
                onSubmit(formData);
                setFormData({ nameClass: '', group: '', professorName: '' });
                setImageProfile(null);
                onClose();
                window.location.reload();
            } else {
                setToastMessage("Erro ao criar turma: " + (response.error || "Erro desconhecido"));
                setShowToast(true);
            }
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
            setToastMessage("Erro ao criar turma. Tente novamente mais tarde."); // Aqui está o uso correto
            setShowToast(true);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Formulário de Turma</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <form onSubmit={handleSubmit}>
                    <IonItem>
                        <IonLabel position="stacked">Turma <span>(obrigatório)</span></IonLabel>
                        <IonInput
                            id="nameClass"
                            type="text"
                            value={formData.nameClass}
                            onIonChange={handleChange}
                            required
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Grupo:</IonLabel>
                        <IonInput
                            id="group"
                            type="text"
                            value={formData.group}
                            onIonChange={handleChange}
                            required
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Nome do Professor:</IonLabel>
                        <IonInput
                            id="professorName"
                            type="text"
                            value={formData.professorName}
                            onIonChange={handleChange}
                            required
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Carregar imagem de perfil:</IonLabel>
                        <IonButton onClick={() => document.getElementById('fileInput')?.click()}>
                            Selecionar arquivo
                        </IonButton>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }} // Esconde o input padrão
                            onChange={handleFileChange}
                        />
                    </IonItem>

                    <div className="ion-margin-top">
                        <IonButton expand="full" type="submit" color="primary">Criar</IonButton>
                    </div>
                </form>

                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage} // Aqui está o uso correto
                    duration={2000}
                />
            </IonContent>
        </IonPage>
    );
};

export default FormNewClass;
