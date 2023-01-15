import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./app/store";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const HomePage = lazy(() => import("./Components/HomePage/HomePage"));
const Manga = lazy(() => import("./Components/Manga/Manga"));
const LandingPage = lazy(() => import("./Components/LandingPage/LandingPage"));
import { inject } from "@vercel/analytics";
import WatchPage from "./Components/WatchPage/WatchPage";
import NotFound from "./Components/NotFound/NotFound";
import SearchPage from "./Components/SearchPage/SearchPage";
import MangaInfo from "./Components/MangaInfo/MangaInfo";
import AboutManga from "./Components/MangaInfo/AboutManga/AboutManga";
import Reader from "./Components/MangaInfo/Reader/Reader";

inject();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={null}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: "anime",
        element: (
          <Suspense fallback={null}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "manga",
        element: (
          <Suspense fallback={null}>
            <Manga />
          </Suspense>
        ),
      },
      {
        path: "manga/:id",
        element: (
          <Suspense fallback={null}>
            <MangaInfo />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={null}>
                <AboutManga />
              </Suspense>
            ),
          },
          {
            path: "chapter",
            element: (
              <Suspense fallback={null}>
                <Reader />
              </Suspense>
            ),
          }
        ],
      },
      {
        path: "watch/:epInfo",
        element: (
          <Suspense fallback={null}>
            <WatchPage />
          </Suspense>
        ),
      },
      {
        path: "/search",
        element: (
          <Suspense fallbak={null}>
            <SearchPage />
          </Suspense>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
