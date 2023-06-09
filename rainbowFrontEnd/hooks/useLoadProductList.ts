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
      console.log('开始访问')
      const data = await getProductList(id)
      return data
    },
    {
      manual: true,
    }
  )

  // useEffect(() => {
  //   if (!data) {
  //     console.log('不执行')
  //     return
  //   }
  //   console.log('Received Data:', data)
  //   const {
  //     productId = '',
  //     originalPrice = 0,
  //     discount = 0,
  //     isSale = false,
  //     isPublish = false,
  //   } = data
  //   dispatch(resetProduct({ productId, originalPrice, discount, isSale, isPublish }))
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data])
  if (data) {
    console.log('Received Data:', data)
    const {
      productId = '',
      originalPrice = 0,
      discount = 0,
      isSale = false,
      isPublish = false,
    } = data
    dispatch(resetProduct({ productId, originalPrice, discount, isSale, isPublish }))
  }

  useEffect(() => {
    run(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return { loading, error }
}

export default useLoadProductList
