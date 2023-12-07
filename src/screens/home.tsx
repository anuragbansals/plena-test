import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts, addToCart, removeFromCart} from '../redux/productSlice';
import {RootState} from '../redux/store';
import {ProductItem} from '../redux/productSlice';
import ProdItem from '../organisms/prodItem';
import {ColorPalette} from '../constants/colors';
import {PathNames} from '../constants/pathnames';

interface IProps {
  navigation: any;
  route: any;
}

const Home = (props: IProps) => {
  const {navigation, route} = props;
  const dispatch = useDispatch();
  const {products, loading, error} = useSelector(
    (state: RootState) => state.products,
  );
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  if (loading) {
    return <Text style={{color: 'black'}}>Loading....</Text>;
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
});
