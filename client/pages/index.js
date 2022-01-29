import Head from 'next/head'
import Card from '../components/Card.jsx'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <>
      <Head>
        <title>Dance Dallas Studio</title>
        <meta name="description" content="Dance Dallas Studio Site" />
        <link rel="icon" href="/favicon.ico" />
        {/* <link href="/fonts/all.css" rel="stylesheet"/> */}
      </Head>
      <div className="container">
        <Header/>
        <main className='mt-2'>
          <div className='row'>
            <Card className='col-m-4 col-t-2 col-1'/>
            <Card className='col-m-4 col-t-2 col-1'/>
            <Card className='col-m-4 col-t-2 col-1'/>
            <Card className='col-m-4 col-t-2 col-1'/>
            <Card className='col-m-4 col-t-2 col-1'/>
          </div>
        </main>
      </div>
      <footer className='bg-gray-light'>
        <Footer/>
      </footer>
    </>
  )
}
