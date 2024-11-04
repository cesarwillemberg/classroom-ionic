import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import Navbar from '../components/Navbar/index';
import Sidebar, { SidebarContext } from '../components/Sidebar';
import { SidebarItem } from '../components/SidebarItem';
import DropdownItem from '../components/DropdownItem';
import Dropdownbtn from '../components/Dropdownbtn';
import CardParent from '../components/CardParent';
import Card from '../components/Card';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Calendar,
  GraduationCap,
  Archive,
  House,
  Settings,
  ListCheckIcon,
} from "lucide-react";


interface Class {
  id: number;
  nameClass: string;
  grupo: string;
  professorName: string;
  profileImage: string | null;
}

const Home: React.FC = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("Home must be used within a SidebarProvider");
  }
  const isFixed = context?.isFixed || false; 

  // const isFixed = context?.isFixed || false; 
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('/src/contexts/dataContexts', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch classes: ${response.statusText} - ${errorText}`);
        }
        const data = await response.json();
        setClasses(data as Class[]);
      } catch (error) {      
        console.log(error);
        console.error('Erro ao buscar classes:', error);
      }
    };
    fetchClasses();
  }, []);

  return (
    <IonPage>
      <IonContent id="main" className={`flex-1 p-4 transition-all duration-300 ${isFixed ? 'ml-[19.5rem]' : 'ml-20'}`}>
        <CardParent>
          {classes.map((classData) => (
            <Card
              key={classData.id}
              title={classData.nameClass}
              grupo={classData.grupo}
              professorName={classData.professorName}
              deadline={classData.deadline}
              activityDetails={classData.activityDetails}
              profileImage={classData.profileImage}
            />
          ))}
        </CardParent>
      </IonContent>
    </IonPage>
  );
};

export default Home;
