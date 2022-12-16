import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './app/store'
import './index.scss'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const HomePage = lazy(() => import('./Components/HomePage/HomePage'))
const Manga = lazy(() => import('./Components/Manga/Manga'))
const LandingPage = lazy(() => import('./LandingPage/LandingPage'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: "/",
        element: <Suspense fallback={null}><LandingPage/></Suspense>,
      },
      {
        path: "/anime",
        element: <Suspense fallback={null}><HomePage/></Suspense>,
      },
      {
        path: "/manga",
        element: <Suspense fallback={null}><Manga/></Suspense>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
