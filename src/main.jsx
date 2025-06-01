import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  RouterProvider } from "react-router";
import { router } from './Router/Route.jsx';
import FirebaseAuthProvider from './FirebaseAuthProvider/FirebaseAuthProvider.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FirebaseAuthProvider>
      <RouterProvider router={router} />
    </FirebaseAuthProvider>
  </StrictMode>
);
