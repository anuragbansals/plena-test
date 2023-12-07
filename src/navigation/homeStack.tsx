import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/home';
import TabBar from './tabBar';
import Cart from '../screens/cart';
import ProductDetails from '../screens/productDetails';
import {PathNames} from '../constants/pathnames';
import ProductStack from './productStack';
import Wishlist from '../screens/wishlist';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

interface IProps {
  navigation: any;
  route: any;
}

const HomeStack = (props: IProps) => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarStyle: {display: 'none'},
        }}
        name={PathNames.productStack}>
        {props => <ProductStack />}
      </Tab.Screen>
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name={PathNames.wishlistScreen}>
        {props => <Wishlist {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default HomeStack;
