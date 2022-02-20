import { useState, useEffect } from 'react'
import useRequest from '../hooks/use-request'

const useLessons = ({manualFetch = false}) => {
    const [lessons, setLessons] = useState([])
    const {doRequest: updateLessons, errors, onSuccess} = useRequest({
        url: '/api/lessons',
        method: 'get',
        onSuccess: (data) => {
            setLessons(data)
        }
    })
    
    const {doRequest: createLesson, errorsCreateLesson, onSuccessCreateLesson} = useRequest({
        url: '/api/lessons',
        method: 'post'
    })

    const {doRequest: toggleStudent} = useRequest({
        url: '/api/lessons',
        method: 'put',
    })

    useEffect(()=>{
        if(!manualFetch) updateLessons()
    }, [])
    return {lessons, updateLessons, createLesson, toggleStudent}
}

export default useLessons