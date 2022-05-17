import * as React from 'react';
import { Admin, ListGuesser, Resource } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

// import authProvider from './authProvider';
// import themeReducer from './themeReducer';
import { Login, Layout } from './layout';
import { Dashboard } from './dashboard';
import customRoutes from './routes';
import englishMessages from './i18n/en';

import visitors from './visitors';
import orders from './orders';
import products from './products';
import invoices from './invoices';
import categories from './categories';
import reviews from './reviews';
import dataProviderFactory from './dataProvider';
import firebase from 'firebase';
import {
    FirebaseAuthProvider,
    FirebaseDataProvider,
    RAFirebaseOptions
  } from 'react-admin-firebase';
import closeSidebarSaga from './layout/closeSidebarSaga';
  

const i18nProvider = polyglotI18nProvider(locale => {
    if (locale === 'fr') {
        return import('./i18n/fr').then(messages => messages.default);
    }

    // Always fallback on english
    return englishMessages;
}, 'en');


const config = {
  apiKey: "AIzaSyC5LGZo9INPGAjMPQe35UW855KVH91bdsM",
  authDomain: "check-add2a.firebaseapp.com",
  projectId: "check-add2a",
  storageBucket: "check-add2a.appspot.com",
  messagingSenderId: "402698517698",
  appId: "1:402698517698:web:0bc9dcfc0ff3096af2cf5b"
};

  
  
  const options: RAFirebaseOptions = {
    logging: true,
    rootRef: "root_collection/Users",
    watch: ["posts"]
  };
  
  
  const authProvider = FirebaseAuthProvider(config,options);
  
  

const App = () => {
  const dataProvider = FirebaseDataProvider(config, options);
   console.log(dataProvider);
    return (
        <Admin
            title=""

            dataProvider={dataProvider}
            // customReducers={{ theme: themeReducer }}
           
            customRoutes={customRoutes}
            authProvider={authProvider}
            dashboard={Dashboard}
            loginPage={Login}
            layout={Layout}
            i18nProvider={i18nProvider}
            disableTelemetry
            customSagas={[ closeSidebarSaga ]} 
        >
            <Resource name="Users" {...visitors}  />
            <Resource
                name="commands"
                {...orders}
                options={{ label: 'Orders' }}
            />
            <Resource name="invoices" {...invoices} />
            <Resource name="products" {...products} />
            <Resource name="categories" {...categories} />
            <Resource name="reviews" {...reviews} />
            
        </Admin>
    );
};

export default App;