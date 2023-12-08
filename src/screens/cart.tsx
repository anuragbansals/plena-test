import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {AppDispatch, RootState} from '../redux/store';
import {ColorPalette} from '../constants/colors';
import {CartItem, decreaseCart, increaseCart} from '../redux/productSlice';
interface IProps {
  navigation: any;
  route: any;
}

const Cart = (props: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const {cart} = useSelector((state: RootState) => state.products);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cart) {
      let subTotal = 0;
      cart.forEach((item: CartItem) => {
        subTotal += item.count * item.item.price;
      });
      setTotal(subTotal);
    }
  }, [cart]);

  const handleAdd = (id: number) => {
    dispatch(increaseCart(id));
  };

  const handleSubtract = (id: number) => {
    dispatch(decreaseCart(id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shopping Cart ({cart.length})</Text>
      <FlatList
        style={styles.flatlist}
        data={cart}
        renderItem={({item}: {item: CartItem}) => (
          <View style={styles.itemContainer}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={{uri: item.item.thumbnail}}
            />
            <View style={{alignItems: 'center'}}>
              <Text style={styles.text}>{item.item.title}</Text>
              <Text style={styles.text}>{item.item.price}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                disabled={item.count === 1}
                onPress={() => handleSubtract(item.item.id)}
                style={styles.symbol}>
                <Text style={styles.symbolText}>-</Text>
              </TouchableOpacity>
              <Text
                style={[
                  styles.symbolText,
                  {color: ColorPalette.black, marginHorizontal: 4},
                ]}>
                {item.count}
              </Text>
              <TouchableOpacity
                onPress={() => handleAdd(item.item.id)}
                style={styles.symbol}>
                <Text style={styles.symbolText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {cart.length !== 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.text}>Subtotal</Text>
          <Text style={styles.text}>{total}</Text>
        </View>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: ColorPalette.white,
  },
  heading: {
    color: ColorPalette.black,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 30,
    maxWidth: '90%',
  },
  itemContainer: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 100,
    height: 80,
  },
  text: {
    color: ColorPalette.black,
  },
  symbolText: {
    color: ColorPalette.white,
  },
  symbol: {
    backgroundColor: ColorPalette.grey,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flatlist: {
    flexGrow: 0,
  },
});
