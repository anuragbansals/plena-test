/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProductDetails} from '../redux/productSlice';
import {RootState} from '../redux/store';
import {ColorPalette} from '../constants/colors';

interface IProps {
  navigation: any;
  route: any;
}

const ProductDetails = (props: IProps) => {
  const {navigation, route} = props;
  const {id} = route.params;
  const dispatch = useDispatch();

  const {productDetails} = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, []);
  return (
    <View style={styles.container}>
      <Text>ProductDetails</Text>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.white,
  },
});
