import React from 'react'
import {BrowserRouter, Routes, Route } from "react-router-dom"
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from "./Pages/Home"
import Search from "./Pages/Search"
import Categorie from './Pages/Categorie.jsx'
import Product from './Pages/Product.jsx'
import Cart from './Pages/Cart.jsx'
import Payment from './Pages/Payment.jsx'
import { QueryClientProvider } from "react-query"
import { queryClient } from './Utils/fetchApi.js'
import PaymentSuccess from './Pages/PaymentSuccess.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<App/>}>
              <Route path='/' element={<Home/>}/>
              <Route path='product/:id' element={<Product/>}/>
              <Route path='search' element={<Search/>}/>
              <Route path='category' element={<Categorie/>}/>
              <Route path='cart' element={<Cart/>}/>
              <Route path='payment' element={<Payment/>}/>
              <Route path='success' element={<PaymentSuccess/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
