import React from "react"
import { Route, Routes } from "react-router"
import AuthPage from "./pages/auth/AuthPage/AuthPage"
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"
import RegistrationPage from "./pages/auth/RegistrationPage/RegistrationPage"
import RootLayout from "./shared/layouts/RootLayout/RootLayout"
import LettersPage from "./pages/LettersPage/LettersPage"
import LetterPage from "./pages/LetterPage/LetterPage"

function App() {
    return (
        <Routes>
            <Route path={"/"}>
                <Route index element={<AuthPage />} />
                <Route path={"registration"} element={<RegistrationPage />} />
                <Route path={"my"} element={<RootLayout />}>
                    <Route index element={<LettersPage />} />
                    <Route path={":mailId"} element={<LetterPage />} />
                </Route>
            </Route>
            <Route path={"*"} element={<NotFoundPage />} />
        </Routes>
    )
}

export default App
