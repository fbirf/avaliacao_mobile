import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from './src/pages/Login';
import HomePage from './src/pages/Home';
import UserPage from './src/pages/User';
import AddRolePage from './src/pages/AddRole';
import UserRolePage from './src/pages/UserRole';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginPage} options={{ title: 'Acesso' }} />
        <Stack.Screen name='Home'  component={HomePage} options={{ title: 'Usuários' }}/>
        <Stack.Screen name='User' component={UserPage} options={{ title: 'Novo Usuário' }} />
        <Stack.Screen name='UserRole' component={UserRolePage} options={{ title: 'Permissões' }}/>
        <Stack.Screen name='AddRole' component={AddRolePage} options={{ title: 'Nova Permissão' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}