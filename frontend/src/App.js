import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';

import {Layout} from './components/Layout'
import { LoginPage} from './components/LoginPage'
import { NotFoundPage} from './components/NotFoundPage'
import { AuthProvider } from './providers/AuthProvider'
import {PrivatePage} from './components/PrivatePage'
import { PrivateRoute } from './components/PrivateRoute'
import  {SocketProvider}  from './providers/SocketProvider'
import { SignUp} from './components/SignUp'


function App() {
  return (

<AuthProvider>

  <SocketProvider> 
     <div className="App">
  
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route index element ={ 
            <PrivateRoute>
              <PrivatePage/>
            </PrivateRoute>
          } />
        <Route path='login' element={<LoginPage />}></Route>
        <Route path='signup' element={<SignUp />}></Route>
        <Route path='*' element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </div>
 </SocketProvider> 
</AuthProvider>
  
  );
}

export default App;

