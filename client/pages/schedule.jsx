import useSchedule from '../hooks/use-schedule'
import Card from '../components/Card'
import {weekDaysShort, monthList} from '@iampetrovpavel/time'
import useRequest from '../hooks/use-request'
import { useEffect, useState } from 'react'

const Schedule = () => {
    const { schedule } = useSchedule()
    const now = new Date()
    function getSevenDates(now) {
        let dates = []
        for(let i=0; i<7; i++){
            let date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i)
            dates.push(date)
        }
        return dates
    }
    function filterScheduleByDay(day){
        return schedule.filter(s=>s.day === day)
    }
    return (
        <div className='row'>
            {getSevenDates(now).map((date) => {
                return filterScheduleByDay(date.getDay()).map(schedule => (
                        <Direction key={schedule.id} date={date} directionId={schedule.directionId}/>
                    ))
            })}
        </div>
    )
}

const Direction = ({date, directionId}) => {
    const [direction, setDirection] = useState(null)
    const {doRequest, errors, onSuccess} = useRequest({
        url: '/api/directions/' + directionId,
        method: 'get',
        onSuccess: (data) => {
            setDirection(data)
        }
    })
    function labelDate(date) {
        return weekDaysShort[date.getDay()] + ' '
            + date.getDate() + ' ' 
            + monthList[date.getMonth()].substr(0,3).toLowerCase() + ' ' 
            + date.getFullYear()
    }
    useEffect(()=>doRequest(), [])
    return direction && <Card 
                key={direction.id} 
                className='col-m-4 col-t-2 col-1' 
                title={direction.name}
                img={direction.img}
                description={direction.description}
                label={labelDate(date)}
            />
}

export default Schedule