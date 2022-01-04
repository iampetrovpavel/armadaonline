import React from "react";
import buildClient from '../api/build-client'
const Main = ({currentUser}) => {
    return (
        <h1>{currentUser?'Hello':'You are not signed'}</h1>
    )
}

Main.getInitialProps = async (context) => {
    const client = buildClient(context)
    const { data } = await client.get('/api/users/currentuser')
    console.log("INDEX DATA", data)
    return data
}

export default Main