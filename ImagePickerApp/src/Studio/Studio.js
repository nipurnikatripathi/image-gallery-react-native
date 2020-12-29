import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StudioHome from './StudioHome';
import UploadImage from './UploadImage';
import Album from './Album';
import DisplaySingleCategory from './Category/DisplaySingleCategory';

const Stack = createStackNavigator();

export default function Studio() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009999',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 22,
        },
      }}>
      <Stack.Screen name="Studio" component={StudioHome} />
      <Stack.Screen name="UploadImage" component={UploadImage} />
      <Stack.Screen name="Album" component={Album} />
      <Stack.Screen
        name="DisplaySingleCategory"
        component={DisplaySingleCategory}
      />
    </Stack.Navigator>
  );
}
