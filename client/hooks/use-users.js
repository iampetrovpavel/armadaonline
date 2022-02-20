import { useState, useEffect } from 'react'
import useRequest from './use-request'

const useUsers = (filter) => {
    const [users, setUsers] = useState([])
    let url = '/api/users'
    if(filter) url += `?${new URLSearchParams(filter).toString()}`
    const {doRequest, errors} = useRequest({
        url,
        method: 'get',
        onSuccess: (data) => {
            setUsers(data)
        }
    })
    useEffect(()=>{
        doRequest()
    }, [])
    return {users, errors}
}

export default useUsers