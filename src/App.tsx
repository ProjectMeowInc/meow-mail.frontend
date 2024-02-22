import React from "react"
import { Route, Routes } from "react-router"
import AuthPage from "./pages/auth/AuthPage/AuthPage"
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"

function App() {
    return (
        <Routes>
            <Route path={"/"}>
                <Route path={"login"} element={<AuthPage/>} />
            </Route>
            <Route path={"*"} element={<NotFoundPage/>} />
        </Routes>
    )
}

export default App
