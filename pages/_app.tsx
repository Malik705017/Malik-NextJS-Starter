import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import Layout from 'components/common/organisms/Layout';
import store from 'models/store';

import 'styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
