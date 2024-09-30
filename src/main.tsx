import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { CookiesProvider } from 'react-cookie'
import { store } from '@/redux/store';
import { router } from './pages/Router';
import '@/assets/scss/index.scss';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// datepicker styles
import 'react-datepicker/dist/react-datepicker.css';

// ----------------------------------------------------------------------
Bugsnag.start({
  apiKey: import.meta.env.VITE_BUGSANG_API_KEY,
  plugins: [new BugsnagPluginReact()],
});
// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-explicit-any
const ErrorBoundary = (Bugsnag as any)
  .getPlugin('react')
  .createErrorBoundary(React);

const persistor = persistStore(store);

// if (typeof (window as any).global === "undefined") {
//   (window as any).global = window;
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CookiesProvider>  
          <ToastContainer autoClose={3000} toastClassName={"shadow-lg"} progressClassName={`bg-indigo-600`} />
          <RouterProvider router={router} />
        </CookiesProvider>
      </PersistGate>
    </Provider>
  </ErrorBoundary>
);
