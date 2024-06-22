import { useRoutes } from "react-router-dom"

const App = () => {
  return (
    <div>
      <h1>Tennis Bot</h1>
    </div>
  )

}

export const AppRoutes = () => {

  const routes = [
    {
      path: '/app',
      element: <App />
    }
  ]

  return useRoutes(routes)
}