/**
 * @description Initial Axios Service
 * @author Luo Wang
 */
import axios from 'axios';

export type ResDataType = {
  [key: string]: any;
};

export type ResType = {
  data?: ResDataType;
  message?: string;
  errno: number;
};

//Set maximum request time
const instance = axios.create({
  timeout: 10 * 1000, //10 seconds
});

//To handle request
//If error number is non-zero after which axios will throw error
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType;
  const {data, message, errno} = resData;
  if (errno !== 0) {
    if (message) {
      console.error(message);
    }
    throw new Error(message);
  }
  return data as any;
});

export default instance;
