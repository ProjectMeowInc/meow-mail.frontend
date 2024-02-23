import React from "react"
import { Route, Routes } from "react-router"
import AuthPage from "./pages/auth/AuthPage/AuthPage"
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"
import RegistrationPage from "./pages/auth/RegistrationPage/RegistrationPage"

function App() {
    return (
        <Routes>
            <Route path={"/"}>
                <Route index element={<AuthPage />} />
                <Route path={"registration"} element={<RegistrationPage />} />
            </Route>
            <Route path={"*"} element={<NotFoundPage />} />
        </Routes>
    )
}

export default App
