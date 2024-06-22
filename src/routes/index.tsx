import { Outlet, useRoutes } from "react-router-dom"
import { Scheduler } from "../features/scheduler"
import { Home } from "../features/home"
import { Navbar } from "../components/Navbar"

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
        { path: 'scheduler', element: <Scheduler /> },
      ]
    }
  ]

  return useRoutes(routes)
}