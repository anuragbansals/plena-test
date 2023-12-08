import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {ColorPalette} from '../constants/colors';
import {AppDispatch, RootState} from '../redux/store';
import {
  ProductItem,
  addFavorite,
  addToCart,
  removeFromCart,
} from '../redux/productSlice';
import ProdItem from '../organisms/prodItem';

interface IProps {
  navigation: any;
  route: any;
}
const Wishlist = (props: IProps) => {
  const {products} = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();
  const handleWishlist = (id: number) => {
    dispatch(addFavorite(id));
  };

  const handleCart = (item: ProductItem, add: boolean) => {
    if (add) {
      dispatch(addToCart(item));
    } else {
      dispatch(removeFromCart(item));
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Wishlist</Text>
      <FlatList
        data={products}
        renderItem={({item}: {item: ProductItem}) =>
          item.isFavorite && (
            <ProdItem
              imageUrl={item.thumbnail}
              name={item.title}
              price={item.price}
              item={item}
              handleWishlist={handleWishlist}
              onPress={handleCart}
              fromWishlist={true}
            />
          )
        }
      />
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.white,
    padding: 24,
  },
  heading: {
    color: ColorPalette.black,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 30,
    maxWidth: '90%',
  },
});
