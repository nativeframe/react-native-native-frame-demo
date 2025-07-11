import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import Home from './pages/Home';
import Watch from './pages/Watch';
import Broadcast from './pages/Broadcast';
import { LogBox } from 'react-native';
import Cam2Cam from './pages/Cam2Cam';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ICF Messenger (React Native)"
            component={Home}
          />
            <Stack.Screen
            name="Watch"
            component={Watch}
          />
           <Stack.Screen
            name="Go Live"
            component={Broadcast}
          />
           <Stack.Screen
            name="Cam 2 Cam"
            component={Cam2Cam}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

LogBox.ignoreAllLogs(true);

export default App;
