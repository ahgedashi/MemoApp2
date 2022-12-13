import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import React from 'react';
import LogInScreen from './src/screens/LogInScreen';
import MemoCreateScreen from './src/screens/MemoCreateScreen';
import MemoDetailScreen from './src/screens/MemoDetailScreen';
import MemoEditScreen from './src/screens/MemoEditScreen';
import MemoListScreen from './src/screens/MemoListScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import firebase from'firebase';

import { firebaseConfig } from './env';

const Stack = createStackNavigator();


//firebase.apps.lengthで既に初期化されているアプリの数を取得できる
//つまり0、何も初期化されてなかったら初期化をはじめてくださいということになる。
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig) //firebaseConfigで firebaseを初期化
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='LogIn'
        screenOptions={{
          headerStyle: { backgroundColor: '#467FD3'},
          headerTitle: 'Memo App',
          headerTitleStyle: { color: '#ffffff' },
          headerTintColor: '#ffffff',
          headerBackTitle: 'Back',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }} 
      >
        <Stack.Screen name="MemoList" component={MemoListScreen} />
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen name="MemoCreate" component={MemoCreateScreen} />
        <Stack.Screen name="MemoDetail" component={MemoDetailScreen} />
        <Stack.Screen name="MemoEdit" component={MemoEditScreen} />
        <Stack.Screen 
          name="SignUp"
          component={SignUpScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}