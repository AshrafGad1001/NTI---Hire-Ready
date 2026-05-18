
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './componets/Layout/Layout';
import { NotFound } from './componets/NotFound/NotFound';
import Projects from './componets/Projects/Projects';
import WebProjects from './componets/WebProjects/WebProjects';
import MobileProjects from './componets/MobileProjects/MobileProjects';
import { Login } from './componets/Login/Login';
import { Register } from './componets/Register/Register';
import { Hero } from './componets/hero/Hero';



function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: "", element: <Layout />, children: [
  //       { path: "", element: <Hero /> },
  //       { path: "home", element: <Home /> },
  //       { path: "about", element: <About /> },
  //       { path: "gallery", element: <Gallery /> },
  //       { path: "services", element: <Services /> },
  //       { path: "contact", element: <Contact /> },
  //       { path: "login", element: <Login /> },
  //       { path: "register", element: <Register /> }
  //     ]
  //   },
  //   {
  //     path: "*",
  //     element: <NotFound />
  //   }
  // ]);

  const router = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { path: "", element: <Hero /> },
        {
          path: "Projects", element: <Projects />, children: [
            { path: "web", element: <WebProjects /> },
            { path: "mobile", element: <MobileProjects /> },
          ],

        },
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
