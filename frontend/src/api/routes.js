
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
 // console.log(data)
  return normalizedData;
}


/*
const apiPath = '/api/v1';
export default {
  loginPath: () => [BASE_URL, 'login'].join('/'),
  usersPath: () => [BASE_URL, 'data'].join('/'),
};

 console.log(res.data)
        window.localStorage.setItem('userId', JSON.stringify(res.data));

  const BASE_URL = 'http://localhost:3001/todos';

export const loadTodos = async () => {
  const res = await fetch(BASE_URL);
      const data = await res.json();
  
      return data;
}
export const createTodo = async (title) => {
  const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, completed: false})
    })
    const data = await res.json();

    return data;
}
export const toggleTodo = async (id, fields) => {
  const res = await fetch('http://localhost:3001/todos/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    })

    const data = await res.json();

    return data;
}
export const removeTodo = async (id) => {
  const res = await fetch('http://localhost:3001/todos/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    await res.json();

    return id;*/