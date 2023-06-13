import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

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

/* Theme variables */
import './theme/variables.css';
import MyComponent from './components/ProgettoSpese/Accedi';
import RegisterPage from './components/ProgettoSpese/Registrazione';
import WelcomePage from './components/ProgettoSpese/Index';
import PersonalAreaPage from "./components/ProgettoSpese/AreaPersonale";
import EliminaAccount from './components/ProgettoSpese/eliminaAccount';


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <IonRouterOutlet>

          <Route exact path="/login" component = {MyComponent}/>
          <Redirect to="/" />

          <Route exact path="/Register" component = {RegisterPage}/>
          <Redirect to="/" />

          <Route exact path="/PersonalArea" component = {PersonalAreaPage}/>
          <Redirect to="/" />

          <Route exact path="/DeleteAccount" component = {EliminaAccount}/>
          <Redirect to="/" />

          <Route exact path="/" component = {WelcomePage}/>
          <Redirect to="/" />


        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
