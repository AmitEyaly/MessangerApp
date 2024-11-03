import { useState } from 'react'
import './App.css'
import HeaderComp from './Comps/HeaderComp'
import { Route, Routes } from 'react-router-dom'
import AuthComp from './Comps/AuthComp'
import RegisterComp from './Comps/RegisterComp'
import LoginComp from './Comps/LoginComp'
import MessangerComp from './Comps/MessangerComp'
import FooterComp from './Comps/FooterComp'
import ContactsComp from './Comps/ContactsComp'




function App() {
  

  return (
    <>
        <HeaderComp/>
        <Routes>
            <Route path='/Home' element={<AuthComp />}></Route>
            <Route>
              <Route path='/Home/register' element={<RegisterComp/>}/>
              <Route path='/Home/login' element={<LoginComp/>} />
            </Route>
            <Route path='/MessangerApp' element={<MessangerComp/>} />
            <Route path='/contacts' element={<ContactsComp/>} />
        </Routes>
        <FooterComp/>
    </>
  )
}

export default App
