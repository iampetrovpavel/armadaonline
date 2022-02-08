import { useState, useEffect } from 'react'
import useRequest from '../hooks/use-request'

const useDirections = () => {
    const [directions, setDirections] = useState([])
    const {doRequest, errors, onSuccess} = useRequest({
        url: '/api/directions',
        method: 'get',
        onSuccess: (data) => {
            setDirections(data)
        }
    })
    
    useEffect(()=>{
        doRequest()
    }, [])
    return {directions, updateDirections: doRequest}
}

export default useDirections