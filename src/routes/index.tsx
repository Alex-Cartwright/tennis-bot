import { Outlet, useRoutes } from "react-router-dom"
import { Scheduler } from "../features/scheduler"
import { Home } from "../features/home"

export const AppRoutes = () => {

  const routes = [
    {
      path: '/',
      element: <Outlet />,
      children: [
        { index: true, element: <Home /> },
        { path: 'scheduler', element: <Scheduler /> },
      ]
    }
  ]

  return useRoutes(routes)
}