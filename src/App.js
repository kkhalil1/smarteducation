import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import ScrollToTop from "react-scroll-to-top";
import { Cart } from './components/Cart'


const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Main />
        <Footer />
      <Cart />
      </Router>
      <Toaster position="top-right" />
      <ScrollToTop smooth />
    </>
  )
}

export default App
