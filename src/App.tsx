import React from "react"
import { Route, Routes } from "react-router"
import AuthPage from "./pages/auth/AuthPage/AuthPage"
import RegistrationPage from "./pages/auth/RegistrationPage/RegistrationPage"

function App() {
    return (
        <Routes>
            <Route path={"/"}>
                <Route path={"login"} element={<AuthPage/>} />
                <Route path={"registration"} element={<RegistrationPage/>} />
            </Route>
        </Routes>
    )
}

export default App
