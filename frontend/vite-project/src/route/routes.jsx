import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Navbar from '../components/base/Navbar'
import Transaction from '../pages/Transaction'

export const routes = createBrowserRouter([
    {
        element: <Navbar />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/transaction",
                element: <Transaction />
            }
        ]
    }
])