import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TabBar from './tabBar';
import {PathNames} from '../constants/pathnames';
import ProductStack from './productStack';
import Wishlist from '../screens/wishlist';

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
          tabBarLabel: 'Products',
        }}
        name={PathNames.productStack}>
        {props => <ProductStack />}
      </Tab.Screen>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Wishlist',
        }}
        name={PathNames.wishlistScreen}>
        {props => <Wishlist {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default HomeStack;
