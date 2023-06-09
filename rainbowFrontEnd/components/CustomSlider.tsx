/**
 * @description Subcomponent Slider
 * @author Luo Wang
 */
import React, { FC, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Slider, Icon } from '@rneui/themed';
import { Text } from '@rneui/base';
import {LinearGradient} from 'expo-linear-gradient';
import { MIDDLE_PART_FONT } from '../constant';
import { changePriceBySlider } from '../store/priceReducer';
import { useDispatch } from 'react-redux';
import { PriceStateType } from '../store/priceReducer';

//PropsType Definition (props from parent component)
type PrposType = {
  productList: PriceStateType
}

const CustomSlider: FC<PrposType> = (props: PrposType) => {
  const productList = props.productList;
  const dispatch = useDispatch();

  let { productId, originalPrice = 0, discount = 0, isSale, isPublish } = productList;
  let discountRate = discount / originalPrice;
  const [value, setValue] = useState(0);

  //useEffect listens for data changes
  useEffect(() => {
    setValue(discountRate * 10 || 0);
  },[productList]);

  //The cursor array is used to generate the sliding scale
  const cursor = new Array(9).fill(0).map((v, i) => i + 1);

  function handleSliderValue(value: number){
    try {
      const discount = (value / 10) * originalPrice;
      dispatch(changePriceBySlider({productId, originalPrice, discount, isSale, isPublish}));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <View style={[styles.contentView]}>
      <View style={{zIndex: 1, display:'flex', flexDirection:'row', width: '100%'}}>
        <Text style={ MIDDLE_PART_FONT }>0%</Text>
        <Text style={{ ...MIDDLE_PART_FONT as {}, marginLeft:'30%'}}>50%</Text>
        <Text style={{ ...MIDDLE_PART_FONT as {}, marginLeft:'30%'}}>100%</Text>
      </View>


      <View style={{zIndex: 1, display:'flex',flexDirection:'row', width:'100%', position: 'absolute'}}>
        {cursor.map((item) => (
          <View key={item} style={[styles.cursorLine]}>
            <Text style={{color: '#ccd9ca'}}>|</Text>
          </View>
        ))}
      </View>

      <View style={{display:'flex',flexDirection:'row', width:'100%'}}>
          <LinearGradient
            colors={['#d6eccd', '#cbe9bf', '#bae3a6']}
            style={{position: 'absolute',
                    height: 40,
                    width:`${value * 10}%`,
                    top: -20,
                    zIndex: 2}} />
      </View>

        <Slider
          style={{zIndex:1}}
          value={value}
          onValueChange={(value) => setValue(value)}
          onSlidingComplete={(value) => handleSliderValue(value)}
          maximumValue={10}
          minimumValue={0}
          step={1}
          allowTouchTrack
          minimumTrackTintColor="#00a137"
          trackStyle={{ height: 5, backgroundColor: 'transparent' }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
          thumbProps={{
            children: (
              <Icon
                name="heartbeat"
                type="font-awesome"
                size={16}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
                color={'#fff'}
              />
            ),
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contentView: {
    width: 250,
    justifyContent: 'center',
    alignItems: 'stretch',
    position: 'relative',
  },

  cursorLine: {
    display: 'flex',
    alignSelf: 'flex-end',
    marginLeft: 21.5,
  },
});

export default CustomSlider;
