import { Outlet, useRoutes } from "react-router-dom"
import { Home } from "../features/home"
import { Booking } from "../features/booking"
import { Schedule } from "../features/schedule/routes/schedule"
import { MainLayout } from "../components/Layout"
import { Locations } from "../features/locations"

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
        { path: 'schedule', element: <Schedule />},
        { path: 'locations', element: <Locations />}
      ]
    }
  ]

  return useRoutes(routes)
}