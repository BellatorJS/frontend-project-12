import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import {HomePage, } from './components/HomePage'
import {Layout} from './components/Layout'
import { LoginPage} from './components/LoginPage'
import {NotFoundPage} from './components/NotFoundPage'
import {AuthProvider} from './components/AuthProvider'
import PrivatePage from './components/PrivatePage'
import { PrivateRoute } from './components/PrivateRoute'


function App() {
  return (

<AuthProvider>
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>

        <Route index path="/" element ={ 
            <PrivateRoute>
              <PrivatePage/>
            </PrivateRoute>
          } />
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='*' element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </div>
</AuthProvider>

  );
}

export default App;
