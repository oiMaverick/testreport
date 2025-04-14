import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Import bootstrap JS only on client side
    import('bootstrap/dist/js/bootstrap');
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
