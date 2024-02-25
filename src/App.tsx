import React from "react"
import { Route, Routes } from "react-router"
import AuthPage from "./pages/auth/AuthPage/AuthPage"
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"
import RegistrationPage from "./pages/auth/RegistrationPage/RegistrationPage"
import LettersPage from "./pages/my/LettersPage/LettersPage"

function App() {
    return (
        <Routes>
            <Route path={"/"}>
                <Route index element={<AuthPage />} />
                <Route path={"registration"} element={<RegistrationPage />} />

                <Route path={"my"}>
                    <Route index element={<LettersPage/>}/>
                </Route>

            </Route>
            <Route path={"*"} element={<NotFoundPage />} />
        </Routes>
    )
}

export default App
