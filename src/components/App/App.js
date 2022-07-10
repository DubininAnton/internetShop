import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import SingInForm from '../singInForm/singInForm';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { SinglePage } from '../pages/SinglePage';
import {ProductsPage} from '../pages/ProductsPage';
import { MyBasket } from '../pages/MyBasket';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route index path="/"
                    element={
                      <>
                        <SinglePage/>
                      </>}/>

            <Route path='/products/:id' 
                element = {
                  <ProductsPage/>}/>
                  
            <Route path='/singIn' 
                    element={
                    <>
                      <SingInForm/>
                    </>}/>
            <Route path='/MyBasket' 
                    element={
                    <>
                      <MyBasket/>
                    </>}/>
            
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
