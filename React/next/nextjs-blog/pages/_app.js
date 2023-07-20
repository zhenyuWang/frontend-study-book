import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export function reportWebVitals(metric) {
  console.log(metric)
}