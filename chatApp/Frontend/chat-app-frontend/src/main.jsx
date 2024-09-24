import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter,RouterProvider } from 'react-router-dom'
import Register from './components/Register.jsx'
import Login from './components/Logincomp.jsx'
import Home from './components/Home.jsx'
import './index.css';
import {Provider} from 'react-redux'
import chatAppStore from './Store/index.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Provider store={chatAppStore}>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    </Provider>
   
  </React.StrictMode>
)
