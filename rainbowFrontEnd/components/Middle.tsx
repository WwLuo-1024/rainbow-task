/**
 * @description Middle Part - Calculation
 * @author Luo Wang
 */
import React, { FC, useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { MIDDLE_PART_FONT } from '../constant'
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from '../store'
import { PriceStateType } from '../store/priceReducer'
import { NEW_PRICE, DISCOUNT_PRICE } from '../constant/index'
import { useDispatch } from 'react-redux'
import CustomSlider from './CustomSlider'

const Middle: FC = () => {
  const productList = useSelector<StateType>(state => state.price) as PriceStateType
  const dispatch = useDispatch()
  const { originalPrice = 0, discount = 0 } = productList
  const newPriceInitial = originalPrice - discount;
  let discountRate = Math.round(discount / originalPrice).toFixed(2)
  const newPriceInitial = originalPrice - discount;

  const [newPrice, setNewPrice] = useState(newPriceInitial.toString())
  const [discountPrice, setDiscountPrice] = useState(discount.toString())
  const [circleValue, setCircleValue] = useState(Number(discountRate) * 100)

  let discountRateRef = useRef(discountRate)
  let priceInt = 0
  let discountInt = 0
  let circleValueInt = 0
  //useEffect listens for data changes
  useEffect(() => {
    priceInt = Math.round(originalPrice - discount)
    setNewPrice(priceInt.toString())

    discountInt = Math.round(discount)
    setDiscountPrice(discountInt.toString())

    discountRateRef.current = (productList.discount / productList.originalPrice).toString()
    circleValueInt = Math.round(Number(discountRateRef.current) * 100);
    setCircleValue(circleValueInt)
  }, [productList])

  /**
   * To handle calculation after user input new discount value
   * @param newDiscount new discount value by user input
   */
  function handleDiscount(newDiscount: number) {
    dispatch(changeDiscount(newDiscount))
    const priceAfterNewDiscount = originalPrice - newDiscount
    dispatch(changeSlider(newDiscount))
    setNewPrice(priceAfterNewDiscount.toString())
    discountRate = (newDiscount / originalPrice).toFixed(2)
    setCircleValue(Math.round(Number(discountRate) * 100))
  }

  /**
   * To handle the impact of the new price
   * @param newPrice new price value by user input
   */
  function handleNewPrice(newPrice: number) {
    const discountAfterNewPrice = originalPrice - newPrice
    dispatch(changeDiscount(discountAfterNewPrice))
    setDiscountPrice(discountAfterNewPrice.toString())
    dispatch(changeSlider(discountAfterNewPrice))
    discountRate = (discountAfterNewPrice / originalPrice).toFixed(2)
    setCircleValue(Math.round(Number(discountRate) * 100))
  }

  return (
    <View>
      <View style={[styles.middleTop]}>
        {/* New Price Input */}
        <View>
          <Text style={MIDDLE_PART_FONT}>{NEW_PRICE}</Text>
          <TextInput
            keyboardType="numeric"
            style={[styles.textInputStyle]}
            value={newPrice}
            onChangeText={value => Number(value) < originalPrice && setNewPrice(value)}
            onEndEditing={value => handleNewPrice(Number(value.nativeEvent.text))}
          />
        </View>

        {/* New Discount Input */}
        <View style={{ marginLeft: 'auto', alignSelf: 'flex-end' }}>
          <Text style={MIDDLE_PART_FONT}>{DISCOUNT_PRICE}</Text>
          <TextInput
            keyboardType="numeric"
            style={[styles.textInputStyle]}
            onChangeText={value => Number(value) < originalPrice && setDiscountPrice(value)}
            onEndEditing={value => handleDiscount(Number(value.nativeEvent.text))}
            value={discountPrice}
          />
        </View>
      </View>

      {/* Bottom */}
      <View style={[styles.middleBottom]}>
        {/* Bottom - Slider */}
        <View>
          <CustomSlider productList={productList} />
        </View>

        {/* Bottom - Circle */}
        <View style={[styles.circleValue]}>
          <Text style={{ fontSize: 18, color: '#ffffff', fontWeight: '700' }}>{circleValue}%</Text>
        </View>
      </View>
    </View>
  )
}

export default Middle

const styles = StyleSheet.create({
  middleTop: {
    display: 'flex',
    flexDirection: 'row',
    padding: 30,
  },

  middleBottom: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
  },

  textInputStyle: {
    width: 150,
    height: 60,
    borderColor: '#e1e5df',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 10,
    marginTop: 10,
  },

  circleValue: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ff9900',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    alignSelf: 'flex-end',
  },
})
