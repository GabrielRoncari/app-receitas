import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Detalhes from './screens/Detalhes';
import Formulario from './screens/Formulario';
import Home from './screens/Home';
import { cores } from './constants/tema';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: cores.primaria },
            headerTintColor: cores.textoClaro,
            headerTitleStyle: { fontWeight: 'bold' },
            contentStyle: { backgroundColor: cores.fundo },
          }}
        >
          <Stack.Screen name="Home" component={Home} options={{ title: 'Caderno de Receitas' }} />
          <Stack.Screen
            name="Detalhes"
            component={Detalhes}
            options={({ route }) => ({ title: route.params.receita.nome })}
          />
          <Stack.Screen name="Formulario" component={Formulario} options={{ title: 'Nova receita' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
