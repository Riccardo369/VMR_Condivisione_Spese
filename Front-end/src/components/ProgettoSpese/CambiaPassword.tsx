import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonToast } from '@ionic/react';

const ChangePasswordPage: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setToastMessage('La nuova password e la conferma password non corrispondono.');
      setShowToast(true);
      return;
    }

    async function changePasswordAPI(currentPassword: string, newPassword: string): Promise<void> {
        try {
          // Effettua la chiamata API per modificare la password utilizzando un'implementazione reale
          // Esempio di implementazione con fetch():
          const response = await fetch('/api/changePassword', {
            method: 'POST',
            body: JSON.stringify({ currentPassword, newPassword }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            throw new Error('La chiamata API per modificare la password non è riuscita.');
          }
      
          // Se la chiamata API ha successo, puoi elaborare la risposta qui
          // Ad esempio, puoi parsare la risposta JSON o fare altre operazioni necessarie
          // In questo esempio, non stiamo ritornando alcun dato, quindi la funzione restituisce 'void'
      
        } catch (error) {
          throw new Error('Si è verificato un errore durante la chiamata API per modificare la password.');
        }
      }
      

    changePasswordAPI(currentPassword, newPassword)
      .then(() => {
        setToastMessage('La password è stata modificata con successo.');
        setShowToast(true);
      })
      .catch((error: any) => { // Aggiungi il tipo 'any' al parametro 'error'
        setToastMessage('Si è verificato un errore durante la modifica della password.');
        setShowToast(true);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cambia Password</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonInput
          type="password"
          placeholder="Password attuale"
          value={currentPassword}
          onIonChange={(e) => setCurrentPassword(e.detail.value!)}
        />
        <IonInput
          type="password"
          placeholder="Nuova password"
          value={newPassword}
          onIonChange={(e) => setNewPassword(e.detail.value!)}
        />
        <IonInput
          type="password"
          placeholder="Conferma nuova password"
          value={confirmPassword}
          onIonChange={(e) => setConfirmPassword(e.detail.value!)}
        />
        <IonButton expand="full" onClick={handleChangePassword}>
          Cambia Password
        </IonButton>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
};

export default ChangePasswordPage;
