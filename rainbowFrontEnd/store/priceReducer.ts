/* eslint-disable prettier/prettier */
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
    loadData(states: PriceStateType) {
      return states
    },

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
  },
})

export const { loadData, resetProduct, changePriceBySlider, changePublish, changeSale } =
  userSlice.actions

export default userSlice.reducer
