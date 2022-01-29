import {useEffect} from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const Signout = () => {
    const {doRequest} = useRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: (data) => {
            Router.push('/')
        }
    })
    useEffect(() => {
        doRequest()
    }, [doRequest])
    return <div>Досвидания...</div>
}

export default Signout