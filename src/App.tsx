import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RootLayout} from "./component/RootLayout.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import FieldPage from "./pages/FieldPage.tsx";
import CropPage from "./pages/CropPage.tsx";
import StaffPage from "./pages/StaffPage.tsx";
import LogPage from "./pages/LogPage.tsx";
import EquipmentPage from "./pages/EquipmentPage.tsx";

function App() {

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout/>,
      children: [
        {path: "/", element: <Dashboard/>},
        {path: "/field", element: <FieldPage/>},
        {path: "/crop", element: <CropPage/>},
        {path: "/staff", element: <StaffPage/>},
        {path: "/log", element: <LogPage/>},
        {path: "/equipment", element: <EquipmentPage/>},
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
