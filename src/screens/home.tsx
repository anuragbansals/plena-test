import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {
  getProducts,
  addToCart,
  removeFromCart,
  addFavorite,
} from '../redux/productSlice';
import {AppDispatch, RootState} from '../redux/store';
import {ProductItem} from '../redux/productSlice';
import ProdItem from '../organisms/prodItem';
import {ColorPalette} from '../constants/colors';
import {PathNames} from '../constants/pathnames';

interface IProps {
  navigation: any;
  route: any;
}

const Home = (props: IProps) => {
  const {navigation} = props;
  const dispatch = useDispatch<AppDispatch>();
  const {products, loading, error} = useSelector(
    (state: RootState) => state.products,
  );
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  if (error) {
    return <Text style={styles.others}>Something went wrong!</Text>;
  }

  if (loading) {
    return <Text style={styles.others}>Loading....</Text>;
  }

  const handleCart = (item: ProductItem, add: boolean) => {
    if (add) {
      dispatch(addToCart(item));
    } else {
      dispatch(removeFromCart(item));
    }
  };
  const handleProductDetail = (id: number) => {
    navigation.navigate(PathNames.productDetailScreen, {
      id: id,
    });
  };

  const handleWishlist = (id: number) => {
    dispatch(addFavorite(id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        data={products}
        renderItem={({item}: {item: ProductItem}) => (
          <ProdItem
            imageUrl={item.thumbnail}
            key={item.id}
            name={item.title}
            price={item.price}
            item={item}
            onPress={handleCart}
            handleProduct={handleProductDetail}
            handleWishlist={handleWishlist}
          />
        )}
      />
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.white,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  others: {
    color: 'black',
    textAlign: 'center',
    marginTop: 12,
  },
});
