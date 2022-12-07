import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import Page from 'components/Page';
import { store } from '../store';
import { Provider } from 'react-redux';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-lightbox/style.css';
import 'aos/dist/aos.css';
import { verifyToken } from '../actions/authActions';
import { getCleaners } from '../actions/cleanerActions';

export default function App({ Component, pageProps }) {

  useEffect(() => {
    store.dispatch(verifyToken());
    store.dispatch(getCleaners());
  }, []);

  return (
    <Provider store={store}>
      <React.Fragment>
        <Head>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, shrink-to-fit=no'
          />
          <title>Cleany | Лучший клинговый сервис в Москве</title>
        </Head>
        <Page>
          <Component {...pageProps} />
        </Page>
      </React.Fragment>
    </Provider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
