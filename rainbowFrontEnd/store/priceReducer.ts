/**
 * @description Redux Reducer and Action
 * @author Luo Wang
 */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import produce from 'immer'

export type PriceStateType = {
  productId: string
  originalPrice: number
  discount: number
  isSale: boolean
  isPublish: boolean
}

const INIT_STATE: PriceStateType = {
  productId: '',
  originalPrice: 0,
  discount: 0,
  isSale: false,
  isPublish: false,
}

export const userSlice = createSlice({
  name: 'price',
  initialState: INIT_STATE,
  reducers: {
    resetProduct(state: PriceStateType, action: PayloadAction<PriceStateType>) {
      return action.payload
    },

    changePriceBySlider(states: PriceStateType, action: PayloadAction<PriceStateType>) {
      return action.payload
    },

    changePublish: produce((draft: PriceStateType, action: PayloadAction<boolean>) => {
      draft.isPublish = action.payload
    }),

    changeSale: produce((draft: PriceStateType, action: PayloadAction<boolean>) => {
      draft.isSale = action.payload
    }),

<<<<<<< HEAD
    changeDiscount: produce((draft: PriceStateType, action: PayloadAction<number>) => {
=======
    /* Change Slider by input text box */
    changeSlider: produce((draft: PriceStateType, action: PayloadAction<number>) => {
>>>>>>> a0b3532f8fbc445e6528b49cd3b571b6b0d3607b
      draft.discount = action.payload
    }),
  },
})

<<<<<<< HEAD
export const { resetProduct, changePriceBySlider, changePublish, changeSale, changeDiscount } =
=======
export const { resetProduct, changePriceBySlider, changePublish, changeSale, changeSlider } =
>>>>>>> a0b3532f8fbc445e6528b49cd3b571b6b0d3607b
  userSlice.actions

export default userSlice.reducer
