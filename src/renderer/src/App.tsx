'use client'

import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './views/Login'
import Products from './views/Products'
import EditProduct from './views/EditProduct'
import AddProduct from './views/AddProduct'

export default function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/editproduct/:id" element={<EditProduct />} />
        <Route path="/addproduct" element={<AddProduct />} />
      </Routes>
    </Router>
  )
}
