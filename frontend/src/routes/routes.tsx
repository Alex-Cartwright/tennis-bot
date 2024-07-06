import { Outlet, useRoutes } from "react-router-dom"
import { MainLayout } from "@/components/Layout/main-layout"
import { Booking } from "@/features/booking/routes/booking"
import { Home } from "@/features/home/home"
import { Schedule } from "@/features/schedule/routes/schedule"
import { Locations } from "@/features/locations/routes/locations"

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