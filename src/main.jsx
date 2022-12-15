import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './app/store'
import './index.scss'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './Components/HomePage/HomePage'
import Manga from './Components/Manga/Manga'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: "/anime",
        element: <HomePage/>
      },
      {
        path: "/manga",
        element: <Manga/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
