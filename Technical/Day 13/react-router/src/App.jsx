import './App.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Hero } from './componets/hero/Hero';
import { Gallery } from './componets/gallery/Gallery';
import { About } from './componets/About/About';
import Layout from './componets/Layout/Layout';


function App() {

  const router = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { path: "", element: <Hero /> },
        { path: "home", element: <Hero /> },
        { path: "about", element: <About /> },
        { path: "gallery", element: <Gallery /> }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} ></RouterProvider>
    </>
  )
}

export default App
