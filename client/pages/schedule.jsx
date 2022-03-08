import useSchedule from '../hooks/use-schedule'
import Card from '../components/Card'
import {weekDaysShort, monthList} from '@iampetrovpavel/time'
import useRequest from '../hooks/use-request'
import { useEffect, useState } from 'react'
import useTeachers from '../hooks/use-teachers'
import useDirections from '../hooks/use-directions'

const Schedule = () => {
    const { schedule } = useSchedule()
    const now = new Date()
    const { teachers } = useTeachers()
    const { directions } = useDirections()

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

    console.log("DEBUG ", teachers, schedule, directions)
    if(teachers.length === 0 || schedule.length === 0 || directions.length === 0) return 'Loading...'
    
    return (
        <div className='row'>
            {getSevenDates(now).map((date) => {
                return filterScheduleByDay(date.getDay()).map(schedule => {
                    const direction = directions.find(d=>d.id === schedule.directionId)
                    return <Direction 
                            key={schedule.id} 
                            date={date} 
                            direction={direction} 
                            teacher = {teachers.find(u => u.id === direction.teacherId)}
                            {...schedule}
                        />
                    })
            })}
        </div>
    )
}

const Direction = ({date, direction, hour, minutes, teacher}) => {
    function labelDate(date) {
        return weekDaysShort[date.getDay()] + ' '
            + date.getDate() + ' ' 
            + monthList[date.getMonth()].substr(0,3).toLowerCase() + ' ' 
            + date.getFullYear()
    }
    return direction && <Card 
                key={direction.id} 
                className='col-m-4 col-t-2 col-1' 
                title={direction.name}
                img={direction.img}
                description={direction.description}
                label={labelDate(date)}
                directionId={direction.id}
                hour = { hour }
                minutes = { minutes }
                teacher = {teacher}
            />
}

export default Schedule