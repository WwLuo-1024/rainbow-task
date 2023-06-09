import axios, { ResDataType } from './ajax'

export type ProductData = {
  id: string
  price: number
  publishDate: string
}

export async function getProductList(id: string): Promise<ResDataType> {
  const url = `http://192.168.1.100:3000/api/product?id=${id}`
  console.log(url)
  //   const data = (await axios.get(url)) as ResDataType
  const data = await axios.get(url)
  return data
}

export async function publishProduct(productData: ProductData) {
  const url = 'http://192.168.1.100:3000/api/product'
  const data = await axios.post(url, productData)
  return data
}
