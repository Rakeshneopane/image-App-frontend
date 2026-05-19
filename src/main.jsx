import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { store } from './store/store.js';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { GoogleCallbackPage } from './pages/GoogleCallBackPage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1> Something Went Wrong. </h1>,
    hydrateFallbackElement: <h1> Fallback Element: Loading... Just for reference now.</h1>,
    children: [
      {
        index: true,          
        element: <LoginPage /> //
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/v1/profile/google",
        element: <GoogleCallbackPage />
      },
      {
        path: "/dashboard",
        element: <DashboardPage />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
