/**
 * @description Top Part - Control whether to sell\
 * @author Luo Wang
 */
import React, { FC, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch } from '@ant-design/react-native';
import { SALE_WORDS, TOP_TITLE } from '../constant';
import { useSelector, useDispatch } from 'react-redux';
import { PriceStateType, changeSale } from '../store/priceReducer';
import { StateType } from '../store';

const Top: FC = () => {
  const dispatch = useDispatch()
  const priceList = useSelector<StateType>(state => state.price) as PriceStateType

  const [isSale, setIsSale] = useState(priceList.isSale)

  //To control sale status
  function handleIsSale(value: boolean) {
    setIsSale(!value);
    dispatch(changeSale(value))
  }

  return (
    <View style={[styles.top]}>
      <View style={[styles.topHeader]}>
        <Text style={[styles.topHeaderLeft]}>{TOP_TITLE}</Text>
        {/* Switch Component */}
        <View style={[styles.topHeaderRight]}>
          <Switch color="#00a137" checked={isSale} onChange={on => handleIsSale(on)} />
        </View>
      </View>
      <View>
        <Text style={[styles.topFooter]}>{SALE_WORDS}</Text>
      </View>
    </View>
  );
};

export default Top;

const styles = StyleSheet.create({
  top: {
    display: 'flex',
    flexDirection: 'column',
    padding: 30,
  },

  topHeader: {
    display: 'flex',
    flexDirection: 'row',
  },

  topHeaderLeft: {
    fontSize: 18,
    fontWeight: '700',
  },

  topHeaderRight: {
    marginLeft: 'auto',
    alignSelf: 'flex-end',
  },

  topFooter: {
    fontSize: 16,
    paddingTop: 15,
  },
});
