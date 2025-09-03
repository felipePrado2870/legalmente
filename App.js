import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/splash';
import HomeScreen from './screens/home';
import Tela1Screen from './screens/telasTemas/tela1';
import Tela2Screen from './screens/telasTemas/tela2';
import Tela3Screen from './screens/telasTemas/tela3';
import Tela4Screen from './screens/telasTemas/tela4';
import Tela5Screen from './screens/telasTemas/tela5';
import Tela6Screen from './screens/telasTemas/tela6';
import Tela7Screen from './screens/telasTemas/tela7';
import Tela8Screen from './screens/telasTemas/tela8';
import Tela9Screen from './screens/telasTemas/tela9';
import DivisionCalculator from './screens/telasTemas/secondScreen/DivisionCalculator';
import RegimeScreen from './screens/telasTemas/secondScreen/RegimeScreen';
import tela10Final from './screens/telasTemas/secondScreen/tela10Final';
import QuizVerdFalsoScreen from './screens/telasTemas/secondScreen/QuizVerdFalso';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TELA1" component={Tela1Screen} />
        <Stack.Screen name="TELA2" component={Tela2Screen} />
        <Stack.Screen name="TELA3" component={Tela3Screen} />
        <Stack.Screen name="TELA4" component={Tela4Screen} />
        <Stack.Screen name="TELA5" component={Tela5Screen} />
        <Stack.Screen name="TELA6" component={Tela6Screen} />
        <Stack.Screen name="TELA7" component={Tela7Screen} />
        <Stack.Screen name="TELA8" component={Tela8Screen} />
        <Stack.Screen name="TELA9" component={Tela9Screen} />
        <Stack.Screen name="TELA10Final" component={tela10Final}/>
        <Stack.Screen name="DivisionCalculator" component={DivisionCalculator}/>
        <Stack.Screen name="Regime" component={RegimeScreen}/>
        <Stack.Screen name="QuizVerdFalso" component={QuizVerdFalsoScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
