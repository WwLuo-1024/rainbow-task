/**
 * @description Footer Part - Publish Button
 * @author Luo Wang
 */
import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button } from '@ant-design/react-native';
import { StateType } from '../store';
import { PriceStateType, changePublish } from '../store/priceReducer';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { ProductData, publishProduct } from '../server/product';

//Create current timestamp (Day-Month-Year)
let currentDate = moment().format('DD-MM-YYYY')
currentDate = currentDate.replace(/-/g, '.')


const Footer: FC = () => {
  const dispatch = useDispatch();
  const priceList = useSelector<StateType>(state => state.price) as PriceStateType;

  const [newPrice, setNewPrice] = useState(0)
  const { isSale, isPublish } = priceList

  //useEffect listens for data changes
  useEffect(() => {
    setNewPrice(priceList.originalPrice - priceList.discount);
  }, [priceList])

  //To handle whether to publish product
  function handlePublish() {
    if (isPublish === false) {
      dispatch(changePublish(true));
      const productData: ProductData = {
        id: priceList.productId,
        price: newPrice,
        publishDate: currentDate,
      };
      publishProduct(productData);
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Button disabled={!isSale || isPublish} style={{ width: 350 }} onPressOut={handlePublish}>
        {isPublish ? `PUBLISHED - ${currentDate}` : 'PUBLISH'}
      </Button>
    </View>
  );
};

export default Footer;
