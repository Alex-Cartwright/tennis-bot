import { Outlet, useRoutes } from "react-router-dom"
import { Scheduler } from "../features/scheduler"

const App = () => {
  return (
    <div>
      <h1>Tennis Bot</h1>
      <Outlet />
    </div>
  )

}

export const AppRoutes = () => {

  const routes = [
    {
      path: '/app',
      element: <App />,
      children: [
        { path: 'scheduler', element: <Scheduler /> },
      ]
    }
  ]

  return useRoutes(routes)
}