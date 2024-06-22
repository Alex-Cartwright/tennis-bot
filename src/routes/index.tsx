import { Outlet, useRoutes } from "react-router-dom"
import { Home } from "../features/home"
import { Navbar } from "../components/Navbar"
import { Booking } from "../features/booking"
import { Schedule } from "../features/schedule/routes/Schedule"

export const AppRoutes = () => {

  const App = () => {
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    )
  }

  const routes = [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: 'booking', element: <Booking /> },
        { path: 'schedule', element: <Schedule />}
      ]
    }
  ]

  return useRoutes(routes)
}