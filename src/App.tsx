import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import AuthContextProvider from "./context/authContext";
import Room from "./components/Room/Room";

const client = new QueryClient();

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/room", children: [{ path: ":roomId", element: <Room /> }] },
]);

function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={client}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
