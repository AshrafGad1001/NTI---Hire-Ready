import './App.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Hero } from './componets/hero/Hero';
import { Gallery } from './componets/gallery/Gallery';
import { About } from './componets/About/About';
import Layout from './componets/Layout/Layout';


function App() {

  let router = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [

        { index: true, element: <Hero /> },
        { path: "gallery", element: <Gallery /> },
        { path: "About", element: <About />, }

      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
