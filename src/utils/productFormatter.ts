import {CartItem, ProductItem} from '../redux/productSlice';

interface ProductCartProps {
  data: Array<ProductItem>;
  payload: ProductItem;
  add: boolean;
  cartData: Array<CartItem>;
}

export const getProductFormatter = (data: any) => {
  let obj = {};
  let products: any = [];
  data.forEach((item: any) => {
    obj = {
      title: item.title,
      category: item.category,
      id: item.id,
      images: item.images,
      price: item.price,
      description: item.description,
      thumbnail: item.thumbnail,
      isFavorite: false,
      addedToCart: false,
    };
    products.push(obj);
  });
  return products;
};

export const cartFormatter = (data, payload, increment = true) => {
  let obj: CartItem | any = {};
  let cartArr: Array<CartItem> = [];
  data.forEach((item: CartItem) => {
    if (payload.id === item.item.id) {
      obj = {
        ...item,
        count: increment ? item.count + 1 : item.count - 1,
      };
    } else {
      obj = {
        ...item,
      };
    }
    cartArr.push(obj);
  });
  return cartArr;
};

export const productCartFormatter = (props: ProductCartProps) => {
  const {add, cartData, data, payload} = props;
  let obj: ProductItem | any = {};
  let cartObj: ProductItem | any = {};
  let products: Array<ProductItem> = [];
  data.forEach((item: ProductItem) => {
    if (item.id === payload.id) {
      obj = {
        ...item,
        addedToCart: !item.addedToCart,
      };
      cartObj = obj;
    } else {
      obj = {
        ...item,
      };
    }
    products.push(obj);
  });
  if (!add) {
    let ind: number = 0;
    cartData.forEach((item: CartItem, index: number) => {
      if (payload.id === item.item.id) {
        ind = index;
      }
    });
    cartData.splice(ind, 1);
  }
  return {
    products,
    cartObj,
    cartData,
  };
};
