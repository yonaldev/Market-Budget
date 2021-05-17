import 'react-native-gesture-handler';
import React from 'react';

import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Inicio from './App/Pages/Inicio';
import List from './App/Pages/List';
import ProductState from './App/context/product/ProductState';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ProductState>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Comenzemos"
          screenOptions={{
            headerTitleAlign: 'center',
          }}>
          <Stack.Screen name="Comenzemos" component={Inicio} />
          <Stack.Screen name="Listado de productos" component={List} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProductState>
  );
};

const styles = StyleSheet.create({});

export default App;
