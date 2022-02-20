import '../styles/reset.css'
import '../styles/globals.css'
import '../styles/admin.css'
import '../styles/tablet.css'
import '../styles/mobile.css'
import '../styles/mixins.css'
import '../styles/close.css'
import '../styles/burger.css'
import '../public/fonts/all.css'
import '../public/fonts/Gilroy/style.css'
import 'animate.css'
import buildClient from '../api/build-client'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Head from 'next/head'


function App({ Component, pageProps, currentUser, url }) {
  return(
      <>
        <Head>
          <title>Dance Dallas Studio</title>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <meta name="description" content="Dance Dallas Studio Site" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container">
          <Header currentUser={currentUser} url={url}/>
          <div className='content p-m-1'>
            <Component {...pageProps} url = {url}/>
          </div>
        </div>
        <footer className='bg-gray-light'>
          <Footer/>
        </footer>
      </>
  )}

App.getInitialProps = async (appContext) => {
    // return {url: appContext.ctx.req.url, currentUser: {name: 'admin', groups:['admin']}}
    try{
      const client = buildClient(appContext.ctx)
      const res = await client.get('/api/users/currentuser', {withCredentials: true})
      const data = res.data
      let pageProps
      if(appContext.Component.getInitialProps){
        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser)
      }
      return {
        pageProps,
        ...data,
        url: appContext.ctx.req && appContext.ctx.req.url
      }
    }
    catch(e){
      console.log(e)
      return {url: appContext.ctx.req && appContext.ctx.req.url}
    }

}

export default App
