import './App.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Hero } from './componets/hero/Hero';
import { Gallery } from './componets/gallery/Gallery';
import { About } from './componets/About/About';
import Layout from './componets/Layout/Layout';
import { Login } from './componets/Login/Login';
import { NotFound } from './componets/NotFound/NotFound';
import { Register } from './componets/Register/Register';


function App() {

  const router = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { path: "", element: <Hero /> },
        { path: "home", element: <Hero /> },
        { path: "about", element: <About /> },
        { path: "gallery", element: <Gallery /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> }
      ]
    },
    {
      path: "*",
      element: <NotFound />}
  ]);
  console.log(typeof (router));

  return (
    <>
      <RouterProvider router={router} ></RouterProvider>
    </>
  )
}

export default App
