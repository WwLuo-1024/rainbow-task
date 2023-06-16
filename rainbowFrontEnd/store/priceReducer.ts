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

    changeDiscount: produce((draft: PriceStateType, action: PayloadAction<number>) => {
      draft.discount = action.payload
    }),
  },
})

export const { resetProduct, changePriceBySlider, changePublish, changeSale, changeDiscount } =
  userSlice.actions

export default userSlice.reducer
