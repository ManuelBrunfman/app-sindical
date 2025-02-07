// App.tsx
import React, { useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

// Importa el proveedor y contexto de autenticación
import { AuthProvider, AuthContext } from './src/context/AuthContext';

// Importa las pantallas
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import DashboardScreen from './src/screens/DashboardScreen';
// Puedes agregar otras pantallas, por ejemplo, una pantalla de credencial virtual, etc.

// Importa la función para registrar notificaciones push
import { registerForPushNotificationsAsync } from './src/services/notifications';

const Stack = createStackNavigator();

// Componente que define la navegación según el estado de autenticación
const AppNavigator = () => {
  // Obtén el usuario desde el contexto
  const { user } = useContext(AuthContext)!;

  return (
    <Stack.Navigator>
      {user ? (
        // Si el usuario está autenticado, muestra la pantalla principal (y otras protegidas)
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
      ) : (
        // Si no hay usuario, muestra las pantallas de login y registro
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  useEffect(() => {
    // Registra el dispositivo para notificaciones push al iniciar la app
    // Esto se ejecuta tanto en dispositivos móviles como, opcionalmente, en web (según implementación)
    registerForPushNotificationsAsync().then((token) => {
      console.log('Token de notificaciones:', token);
      // Aquí podrías almacenar el token en tu backend o en el contexto de usuario si lo necesitas
    });
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
