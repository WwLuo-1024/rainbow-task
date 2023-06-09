/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit'
import priceReducer from './priceReducer'
import { PriceStateType } from './priceReducer'

export type StateType = {
  price: PriceStateType
}

export default configureStore({
  reducer: {
    price: priceReducer,
  },
})
