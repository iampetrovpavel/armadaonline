import 'bootstrap/dist/css/bootstrap.css'
import buildClient from "../api/build-client";
import Main from "./index";
import Header from "../components/header";

const App = ({ Component, pageProps, currentUser}) => {
    return <div>
        <script src="https://static.yoomoney.ru/checkout-js/v1/checkout.js"></script>
        <script src="https://yookassa.ru/checkout-widget/v1/checkout-widget.js"></script>
        <Header currentUser={currentUser}/>
        <div className='container'>
            <Component {...pageProps} currentUser={currentUser}/>
        </div>
    </div>
}

App.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx)
    const { data } = await client.get('/api/users/currentuser')
    let pageProps = {};
    if( appContext.Component.getInitialProps ) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser)
    }
    return {
        pageProps,
        ...data
    }
}

export default App