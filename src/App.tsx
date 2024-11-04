import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import SidebarProvider from './components/Sidebar';
import { SidebarItem } from './components/SidebarItem';
import DropdownItem from './components/DropdownItem';
import Dropdownbtn from './components/Dropdownbtn';
import { 
  Calendar,
  GraduationCap,
  Archive,
  House,
  Settings,
  ListCheckIcon,
} from "lucide-react";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <SidebarProvider> 
        <SidebarItem icon={<House size={20} />} text="Inicio" src="/" />
        <SidebarItem icon={<Calendar size={20} />} text="Agenda" src="/Agenda" />
        <Dropdownbtn icon={<GraduationCap size={20}/>} label="Minhas inscrições" border="border-solid border-t border-b border-gray"> 
            <DropdownItem icon={<ListCheckIcon size={20} />} text="Pendentes" src="/Pendentes" />
        </Dropdownbtn>
        <SidebarItem icon={<Archive size={20} />} text="Turmas arquivadas" src="/TurmasArquivdas" />
        <SidebarItem icon={<Settings size={20}/>} text="Configuracoes" src="/configuracoes" />
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </SidebarProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
