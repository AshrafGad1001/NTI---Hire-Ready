import './App.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Hero } from './componets/hero/Hero';
import { Gallery } from './componets/gallery/Gallery';
import { About } from './componets/About/About';
import Layout from './componets/Layout/Layout';
import { Login } from './componets/Login/Login';
import { NotFound } from './componets/NotFound/NotFound';
import { Register } from './componets/Register/Register';
import { Home } from './componets/Home/Home';


function App() {

  const router = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { path: "", element: <Hero /> },
        { path: "home", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "gallery", element: <Gallery /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> }
      ]
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);

  return (
    <>
      <RouterProvider router={router} ></RouterProvider>
    </>
  )
}

export default App
