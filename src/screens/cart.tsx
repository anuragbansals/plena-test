import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

interface IProps {
  navigation: any;
  route: any;
}

const Cart = (props: IProps) => {
  const {cart} = useSelector((state: RootState) => state.products);
  return (
    <View>
      <Text>Cart</Text>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({});
