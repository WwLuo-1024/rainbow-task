/**
 * @description Custom Hook to handle network request (data)
 * @author Luo Wang
 */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRequest } from 'ahooks'
import { getProductList } from '../server/product'
import { resetProduct } from '../store/priceReducer'

function useLoadProductList() {
  let id = '100' //Assume the product id is 100(/product?id=100)
  const dispatch = useDispatch()

  //ajax loading
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) {
        throw new Error('No Product Id')
      }
      // console.log('Start to load')
      const data = await getProductList(id)
      return data
    },
    {
      manual: true,
    }
  )

  useEffect(() => {
    if (!data) {
      return
    }
    console.log('Received Data:', data)
    const {
      productId = '',
      originalPrice = 0,
      discount = 0,
      isSale = false,
      isPublish = false,
    } = data
    dispatch(resetProduct({ productId, originalPrice, discount, isSale, isPublish }))
  }, [data])

  //Manually network request when id changed
  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadProductList
