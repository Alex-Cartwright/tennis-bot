import { Outlet, useRoutes } from "react-router-dom"
import { Home } from "../features/home"
import { Booking } from "../features/booking"
import { Schedule } from "../features/schedule/routes/Schedule"
import { MainLayout } from "../components/Layout"

export const AppRoutes = () => {

  const App = () => {
    return (
      <div>
        <MainLayout>
          <Outlet />
        </MainLayout>
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