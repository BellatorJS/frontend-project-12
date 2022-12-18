
  import { normalize, schema } from 'normalizr';
import axios from 'axios';

const BASE_URL = '/api/v1/'

const getNormalalized = (data) => {
  const channel = new schema.Entity('channels')
  const message = new schema.Entity('messages')

  const contentSchema = { 
    channels: [channel],
    messages:[message] 
  
  };
  const normalizedData = normalize(data, contentSchema);

  return normalizedData;
};
export const postLogin = async (values) => {
  const res = await axios.post([BASE_URL, 'login'].join('/'), values);
  const data = await res.data;
  return window.localStorage.setItem('userId', JSON.stringify(data))
      
}
export const fetchData = async (getAuth) => {
  const { data } = await axios.get([BASE_URL, 'data'].join('/'), { headers: getAuth() });
  const normalizedData = await getNormalalized(data);
  return normalizedData;
}



export const postSignup = async (values) => {
  console.log("asdsdadas")
  const res = await axios.post([BASE_URL, 'signup'].join('/'), values);
  const newUser =await res.data;
  return window.localStorage.setItem(newUser.username, JSON.stringify(newUser))

}