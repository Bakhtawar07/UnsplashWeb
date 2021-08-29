import '../styles/globals.css'
import Layout from '../components/Layout'
import { Children } from 'react'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )

}

export default MyApp
