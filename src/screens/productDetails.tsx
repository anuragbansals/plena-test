/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';

import {
  addFavorite,
  addToCart,
  getProductDetails,
  removeFromCart,
} from '../redux/productSlice';
import {AppDispatch, RootState} from '../redux/store';
import {ColorPalette} from '../constants/colors';
import CustomButton from '../atoms/button';
import {PathNames} from '../constants/pathnames';

interface IProps {
  navigation: any;
  route: any;
}

const ProductDetails = (props: IProps) => {
  const {navigation, route} = props;
  const {id} = route.params;
  const [curr, setCurr] = useState(0);

  const [carouselImages, setCarouselImages] = useState([]);
  const dispatch = useDispatch<AppDispatch>();

  const {productDetails, loading} = useSelector(
    (state: RootState) => state.products,
  );
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, []);

  useFocusEffect(() => {
    let interval = setInterval(() => {
      let c = curr + 1;
      if (c === carouselImages.length) {
        c = 0;
      }
      setCurr(c);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  });

  const handlePress = () => {
    if (productDetails?.addedToCart) {
      dispatch(removeFromCart(productDetails));
    } else {
      dispatch(addToCart(productDetails));
    }
  };

  const handleBuy = () => {
    navigation.navigate(PathNames.cartScreen);
  };

  useMemo(() => {
    if (productDetails) {
      setCarouselImages([...productDetails.images]);
    }
  }, [productDetails]);

  const handleWishlist = (id: number) => {
    dispatch(addFavorite(id));
  };

  if (loading) {
    return <Text style={styles.text}>Loading.....</Text>;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{productDetails?.title}</Text>
      <View style={{alignSelf: 'flex-end', paddingHorizontal: 12}}>
        <Icon
          onPress={() => handleWishlist(productDetails?.id)}
          name="heart"
          size={20}
          color={productDetails?.isFavorite ? 'red' : ColorPalette.grey}
        />
      </View>
      <Image style={styles.image} src={carouselImages[curr]} />
      <View style={styles.dotContainer}>
        {carouselImages.map((item: any, index: number) => {
          return (
            <View
              key={index}
              style={[styles.dot, index === curr ? styles.activeDot : null]}
            />
          );
        })}
      </View>
      <Text style={styles.priceText}>Rs {productDetails?.price}</Text>
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={handlePress}
          title={
            productDetails?.addedToCart ? 'Remove from cart' : 'Add to cart'
          }
          buttonStyles={styles.btn}
          titleStyle={styles.btnText}
        />
        <CustomButton
          isDisable={!productDetails?.addedToCart}
          onPress={handleBuy}
          titleStyle={styles.btnText}
          buttonStyles={[
            styles.btn,
            !productDetails?.addedToCart ? {opacity: 0.6} : {},
          ]}
          title="Buy Now"
        />
      </View>
      <Text style={styles.detailText}>Details</Text>
      <Text style={styles.descrText}>{productDetails?.description}</Text>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.white,
    padding: 12,
  },
  title: {
    color: ColorPalette.black,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 30,
    maxWidth: '90%',
  },
  text: {
    textAlign: 'center',
    color: ColorPalette.black,
  },
  dot: {
    height: 6,
    width: 8,
    borderRadius: 5,
    backgroundColor: ColorPalette.white,
    marginHorizontal: 4,
    borderWidth: 1,
  },
  activeDot: {
    width: 18,
    borderRadius: 4,
    backgroundColor: ColorPalette.grey,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 12,
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  priceText: {
    color: ColorPalette.black,
    marginTop: 32,
    fontSize: 20,
    marginHorizontal: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  btn: {
    width: '40%',
    paddingVertical: 12,
    borderRadius: 20,
  },
  btnText: {
    color: ColorPalette.white,
  },
  detailText: {
    color: ColorPalette.black,
    marginTop: 16,
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  descrText: {
    color: ColorPalette.black,
    marginHorizontal: 12,
  },
});
