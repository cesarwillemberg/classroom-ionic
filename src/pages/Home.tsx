import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import './Home.css';
import Navbar from '../components/Navbar/index';
import Sidebar, { SidebarContext } from '../components/Sidebar';
import { SidebarItem } from '../components/SidebarItem';
import DropdownItem from '../components/DropdownItem';
import Dropdownbtn from '../components/Dropdownbtn';
import CardParent from '../components/CardParent';
import Card from '../components/Card';
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
  deadline: string;
  activityDetails: string;
  profileImage: string | null;
}

const Home: React.FC = () => {

  const [expanded, setExpanded] = useState<boolean>(false);
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const [classes, setClasses] = useState<Class[]>([]);

  // console.log( expanded || isFixed );
  // const context = useContext(SidebarContext);
  // console.log(context);
  // if (!context) {
  //   throw new Error("Home must be used within a SidebarProvider");
  // }
  // const isFixed = context?.isFixed || false; 
  // const isFixed = context?.isFixed || false; 

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://200.132.192.203:3000/';
        const response = await fetch(apiUrl , {
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

  const toggleSidebar = () => {
    setIsFixed(prev => !prev);
    setExpanded(prev => !prev);
};

  return (
    <IonPage>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar setIsFixed={setIsFixed} isFixed={isFixed} setExpanded={setExpanded} expanded={expanded}> 
        <SidebarItem icon={<House size={20} />} text="Inicio" src="/" expanded={expanded} />
        <SidebarItem icon={<Calendar size={20} />} text="Agenda" src="/Agenda" expanded={expanded} />
        <Dropdownbtn icon={<GraduationCap size={20}/>} label="Minhas inscrições" border="border-solid border-t border-b border-gray" expanded={expanded}> 
            <DropdownItem icon={<ListCheckIcon size={20} />} text="Pendentes" src="/Pendentes" expanded={expanded} />
        </Dropdownbtn>
        <SidebarItem icon={<Archive size={20} />} text="Turmas arquivadas" src="/TurmasArquivdas" expanded={expanded} />
        <SidebarItem icon={<Settings size={20}/>} text="Configuracoes" src="/configuracoes" expanded={expanded} />
      </Sidebar>
      <IonContent id="main" className={`flex-1 p-4 transition-all duration-300`}>
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
