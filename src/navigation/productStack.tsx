import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/home';
import ProductDetails from '../screens/productDetails';
import Cart from '../screens/cart';
import {PathNames} from '../constants/pathnames';

const Stack = createNativeStackNavigator();

const ProductStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name={PathNames.homeScreen}>
        {props => <Home {...props} />}
      </Stack.Screen>
      <Stack.Screen options={{title: ''}} name={PathNames.productDetailScreen}>
        {props => <ProductDetails {...props} />}
      </Stack.Screen>
      <Stack.Screen name={PathNames.cartScreen}>
        {props => <Cart {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default ProductStack;
