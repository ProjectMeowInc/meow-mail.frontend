import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthPage from "./pages/auth/AuthPage/AuthPage"
import RegistrationPage from "./pages/auth/RegistrationPage/RegistrationPage"
import LettersPage from "./pages/LettersPage/LettersPage"
import LetterPage from "./pages/LetterPage/LetterPage"
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"
import RootLayout from "./shared/layouts/RootLayout/RootLayout"
import EmailGroupPage from "./pages/EmailGroupPage/EmailGroupPage"
import AgreementProcessingPersonalDataPage from "./pages/auth/AgreementProcessingPersonalDataPage/AgreementProcessingPersonalDataPage"

const router = createBrowserRouter([
    {
        path: "/",
        children: [

            {
                index: true,
                element: <AuthPage/>
            },

            {
                path: "registration",
                element: <RegistrationPage/>
            },

            {
                path: "confidentiality-agreement",
                element: <AgreementProcessingPersonalDataPage/>
            },

            {
                path: "my",
                element: <RootLayout/>,
                children: [

                    {
                        index: true,
                        element: <LettersPage/>
                    },

                    {
                        path: ":mailId",
                        element: <LetterPage/>
                    },

                    {
                        path: "email-group/:groupId",
                        element: <EmailGroupPage/>
                    },
                ]
            },

            {
                path: "*",
                element: <NotFoundPage/>
            }
        ]
    }
])

function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App
