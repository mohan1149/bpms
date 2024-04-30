import React, { Suspense } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppRouter from './routing/AppRouter';
import { I18nextProvider } from 'react-i18next';
import i18n from './lang/i18n';

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback="....loading">
        <I18nextProvider i18n={i18n}>
          <AppRouter />
        </I18nextProvider>
      </Suspense>
    </Provider>
  );
}

export default App;
