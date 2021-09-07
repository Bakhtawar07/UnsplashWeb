import '../styles/globals.css'
import Layout from '../components/Layout'
import { Children } from 'react'
import {Provider} from 'react-redux'
import withRedux from 'next-redux-wrapper'
import store from '../redux/store'


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </Provider>
  )

}

export default MyApp
