import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RootLayout} from "./component/RootLayout.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import FieldPage from "./pages/FieldPage.tsx";

function App() {

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout/>,
      children: [
        {path: "/", element: <Dashboard/>},
        {path: "/field", element: <FieldPage/>},
        // {path: "/update", element: <Update/>},
        // {path: "/delete", element: <Delete/>}
      ]
    },
    // {path: "*", element: <Error/>}
  ])

  return (
      <>
        <RouterProvider router={routes}></RouterProvider>
      </>
  )
}

export default App
