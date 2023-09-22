import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { CountiresProvider } from './context/CountriesContext.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:countryCode",
    element: <App />,
    children: [
      {
        path: "",
        element: <div>dd</div>,
      },
      {
        path: "airports",
        element: <div>popo</div>,
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CountiresProvider>
      <RouterProvider router={router} />
    </CountiresProvider>
  </React.StrictMode>,
)
