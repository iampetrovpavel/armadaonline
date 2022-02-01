import '../styles/globals.css'
import '../styles/mobile.css'
import '../styles/tablet.css'
import '../styles/mixins.css'
import '../public/fonts/all.css'
import buildClient from '../api/build-client'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Head from 'next/head'


function App({ Component, pageProps, currentUser }) {
  return(
      <>
        <Head>
          <title>Dance Dallas Studio</title>
          <meta name="description" content="Dance Dallas Studio Site" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container">
          <Header currentUser={currentUser}/>
          <main className='mt-2'>
            <Component {...pageProps} />
          </main>
        </div>
        <footer className='bg-gray-light'>
          <Footer/>
        </footer>
      </>
  )}

App.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx)
    const res = await client.get('/api/users/currentuser')
    const data = res.data
    let pageProps
    if(appContext.Component.getInitialProps){
      pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser)
    }
    return {
      pageProps,
      ...data
    }
}

export default App
