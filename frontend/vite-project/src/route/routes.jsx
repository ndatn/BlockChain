import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Navbar from '../components/base/Navbar'
import Transaction from '../pages/Transaction'
import UserProfile from '../pages/UserProfile'

export const routes = createBrowserRouter([
    {
        element: <Navbar />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/user-profile/:accountId",
                element: <UserProfile />
            },
            {
                path: "/transaction",
                element: <Transaction />
            }
        ]
    }
])