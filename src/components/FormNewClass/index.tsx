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
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
} from '@ionic/react';

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
    
        if (e.target instanceof HTMLInputElement && e.target.type === "file") {
            const file = e.target.files ? e.target.files[0] : null;
            setFormData((prevState) => ({
                ...prevState,
                [name]: file,
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
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
            const response = await fetch('/src/api/cards/route.ts', {
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
            } else {
                setToastMessage("Erro ao criar turma: " + (response.error || "Erro desconhecido"));
                setShowToast(true);
            }
        } catch (error) {
            console.log('aaaaa');
            console.error("Erro ao enviar dados:", error);
            setToastMessage("Erro ao criar turma. Tente novamente mais tarde.");
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
                            type="text"
                            name="nameClass"
                            value={formData.nameClass}
                            onIonChange={handleChange}
                            required
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Grupo:</IonLabel>
                        <IonInput
                            type="text"
                            name="group"
                            value={formData.group}
                            onIonChange={handleChange}
                            required
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Nome do Professor:</IonLabel>
                        <IonInput
                            type="text"
                            name="professorName"
                            value={formData.professorName}
                            onIonChange={handleChange}
                            required
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Carregar imagem de perfil:</IonLabel>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </IonItem>

                    <div className="ion-margin-top">
                        {/* <IonButton expand="full" color="light" onClick={onClose}>Cancelar</IonButton> */}
                        <IonButton expand="full" type="submit" color="primary">Criar</IonButton>
                    </div>
                </form>

                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message="Formulário enviado com sucesso!"
                    duration={2000}
                />
            </IonContent>
        </IonPage>
    );
};

export default FormNewClass;
