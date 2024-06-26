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
import "./index.css"
import { useAppSelector } from "./store"
import SettingsPage from "./pages/SettingsPage/SettingsPage"
import SentEmailsPage from "./pages/SentEmailsPage/SentEmailsPage"
import UserListPage from "./pages/admin/UserListPage/UserListPage"
import DmarcReportPage from "./pages/admin/DmarcReportPage/DmarcReportPage"

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                index: true,
                element: <AuthPage />,
            },

            {
                path: "registration",
                element: <RegistrationPage />,
            },

            {
                path: "confidentiality-agreement",
                element: <AgreementProcessingPersonalDataPage />,
            },

            {
                path: "my",
                element: <RootLayout />,
                children: [
                    {
                        index: true,
                        element: <LettersPage />,
                    },

                    {
                        path: ":mailId",
                        element: <LetterPage />,
                    },

                    {
                        path: "email-group/:groupId",
                        element: <EmailGroupPage />,
                    },

                    {
                        path: "admin",
                        children: [
                            {
                                path: "users",
                                element: <UserListPage />,
                            },

                            {
                                path: "dmarc-reports",
                                element: <DmarcReportPage />,
                            },
                        ],
                    },

                    {
                        path: "settings",
                        element: <SettingsPage />,
                    },

                    {
                        path: "sent",
                        children: [
                            {
                                index: true,
                                element: <SentEmailsPage />,
                            },

                            {
                                path: ":mailId",
                                element: <LetterPage />,
                            },
                        ],
                    },
                ],
            },

            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
])

function App() {
    const theme = useAppSelector((state) => state.theme.theme)

    return (
        <div data-theme={theme}>
            <RouterProvider router={router} />
        </div>
    )
}

export default App
