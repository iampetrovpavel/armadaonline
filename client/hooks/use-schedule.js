import { useState, useEffect } from 'react'
import useRequest from '../hooks/use-request'

const useSchedule = (directionId) => {
    const [schedule, setSchedule] = useState([])
    const params = directionId?('/'+directionId):null
    console.log("PARAMS ", params)

    const {doRequest: updateSchedule, errors} = useRequest({
        url: '/api/schedule',
        method: 'get',
        onSuccess: (data) => {
            setSchedule(data)
        }
    })

    const { doRequest: createSchedule } = useRequest({
        url: '/api/schedule',
        method: 'post',
        onSuccess: () => {
            updateSchedule({params})
        }
    })

    const { doRequest: deleteSchedule } = useRequest({
        url: '/api/schedule',
        method: 'delete',
        onSuccess: () => {
            updateSchedule({params})
        }
    })

    useEffect(()=>{
        updateSchedule({params})
    }, [])
    return {schedule, updateSchedule, createSchedule, deleteSchedule}
}

export default useSchedule