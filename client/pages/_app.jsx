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


function App({ Component, pageProps, currentUser, url, directions }) {
  return(
      <>
        <Head>
          <title>Dance Dallas Studio</title>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <meta name="description" content="Dance Dallas Studio Site" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container">
          <Header currentUser={currentUser} url={url} directions = {directions}/>
          <div className='content '>
            <Component {...pageProps} url = {url} currentUser = {currentUser} directions = {directions}/>
          </div>
        </div>
        <footer className='bg-gray-light'>
          <Footer/>
        </footer>
      </>
  )}

App.getInitialProps = async (appContext) => {
    try{
      const client = buildClient(appContext.ctx)
      const res = await client.get('/api/users/currentuser', {withCredentials: true})
      const currentUser = res.data.currentUser
      const {data: directions} = await client.get('/api/directions');
      console.log("APP:DEBUG", directions)
      let pageProps
      if(appContext.Component.getInitialProps){
        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, currentUser)
      }
      return {
        ...pageProps,
        currentUser,
        directions,
        url: appContext.ctx.req && appContext.ctx.req.url
      }
    }
    catch(e){
      console.log(e)
      return {url: appContext.ctx.req && appContext.ctx.req.url}
    }

}

export default App
