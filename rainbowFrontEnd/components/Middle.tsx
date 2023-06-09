import React, { FC, useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { MIDDLE_PART_FONT } from '../constant'
import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { PriceStateType } from '../store/priceReducer'
import CustomSlider from './CustomSlider'

const Middle: FC = () => {
  const productList = useSelector<StateType>(state => state.price) as PriceStateType
  const { originalPrice = 0, discount = 0 } = productList
  let discountRate = Math.round(discount / originalPrice).toFixed(2)
  const newPriceInitial = originalPrice - discount;

  const [newPrice, setNewPrice] = useState(newPriceInitial.toString())
  const [discountPrice, setDiscountPrice] = useState(discount.toString())
  const [circleValue, setCircleValue] = useState(Number(discountRate) * 100)

  let discountRateRef = useRef(discountRate)

  useEffect(() => {
    const priceInt = Math.round(productList.originalPrice - productList.discount)
    setNewPrice(priceInt.toString())
    const discountInt = Math.round(productList.discount)
    setDiscountPrice(discountInt.toString())
    discountRateRef.current = (productList.discount / productList.originalPrice).toString()
    const circleValueInt = Math.round(Number(discountRateRef.current) * 100);
    setCircleValue(circleValueInt)
  }, [productList])

  function handleDiscount(newDiscount: number) {
    const priceAfterNewDiscount = originalPrice - newDiscount
    setNewPrice(priceAfterNewDiscount.toString())
    discountRate = (newDiscount / originalPrice).toFixed(2)
    setCircleValue(Math.round(Number(discountRate) * 100))
  }

  function handleNewPrice(newPrice: number) {
    const discountAfterNewPrice = originalPrice - newPrice
    setDiscountPrice(discountAfterNewPrice.toString())
    discountRate = (discountAfterNewPrice / originalPrice).toFixed(2)
    setCircleValue(Math.round(Number(discountRate) * 100))
  }

  return (
    <View>
      <View style={[styles.middleTop]}>
        <View>
          <Text style={MIDDLE_PART_FONT}>New Price, USD</Text>
          <TextInput
            keyboardType="numeric"
            style={[styles.textInputStyle]}
            value={newPrice}
            onChangeText={value => Number(value) < originalPrice && setNewPrice(value)}
            onEndEditing={value => handleNewPrice(Number(value.nativeEvent.text))}
          />
        </View>
        <View style={{ marginLeft: 'auto', alignSelf: 'flex-end' }}>
          <Text style={MIDDLE_PART_FONT}>Discount, USD</Text>
          <TextInput
            keyboardType="numeric"
            style={[styles.textInputStyle]}
            onChangeText={value => Number(value) < originalPrice && setDiscountPrice(value)}
            onEndEditing={value => handleDiscount(Number(value.nativeEvent.text))}
            value={discountPrice}
          />
        </View>
      </View>

      <View style={[styles.middleBottom]}>
        <View>
          <CustomSlider productList={productList} />
        </View>
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
