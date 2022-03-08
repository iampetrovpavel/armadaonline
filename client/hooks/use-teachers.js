import { useState, useEffect } from 'react'
import useRequest from './use-request'

const useTeachers = (filter) => {
    const [teachers, setTeachers] = useState([])
    let url = '/api/users/teachers'
    if(filter) url += `?${new URLSearchParams(filter).toString()}`
    const {doRequest, errors} = useRequest({
        url,
        method: 'get',
        onSuccess: (data) => {
            setTeachers(data)
        }
    })
    useEffect(()=>{
        doRequest()
    }, [])
    return {teachers, errors}
}

export default useTeachers