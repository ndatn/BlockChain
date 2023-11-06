import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Detail from '../pages/Detail'
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
                path: "/:id",
                element: <Detail />
            },
            {
                path: "/transaction",
                element: <Transaction />
            }
        ]
    }
])