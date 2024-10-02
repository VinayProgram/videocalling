import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import MainVideoCall from "./MainVideoCall";
import RandomChat from "./RandomChat";
const myroutes = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "RoomID/:id",
        element: <MainVideoCall />,
      },
      {
        path: "RandomRoom/:id",
        element: <RandomChat />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={myroutes} />;
};

export default App;
