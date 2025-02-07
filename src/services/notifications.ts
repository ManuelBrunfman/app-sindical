// src/services/notifications.ts
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export const registerForPushNotificationsAsync = async (): Promise<string | undefined> => {
  try {
    // Extraer projectId y applicationId de la configuración
    const projectId = Constants.expoConfig?.extra?.eas?.projectId;
    const applicationId = Constants.expoConfig?.extra?.applicationId;

    if (!projectId) {
      throw new Error("Faltan projectId en la configuración");
    }
    if (!applicationId) {
      throw new Error("No 'applicationId' found. Provide it in app.config.js or .env.");
    }

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Se necesitan permisos para notificaciones push!');
      return;
    }

    // Pasar projectId y applicationId al obtener el token
    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId: projectId,
      applicationId: applicationId,
    });
    console.log('Token generado:', tokenData.data);
    return tokenData.data;
  } catch (error) {
    console.error('Error registrando notificaciones:', error);
    throw error;
  }
};
