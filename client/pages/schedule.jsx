import useSchedule from '../hooks/use-schedule'
import Card from '../components/Card'
import {weekDaysShort, monthList} from '@iampetrovpavel/time'
import useRequest from '../hooks/use-request'
import { useEffect, useState } from 'react'
import useTeachers from '../hooks/use-teachers'
import useDirections from '../hooks/use-directions'
import { addZero } from '@iampetrovpavel/time'
import Router from 'next/router'

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

    if(teachers.length === 0 || schedule.length === 0 || directions.length === 0) return 'Loading...'
    
    return (
        <div className='row'>
            {getSevenDates(now).map((date) => {
                return filterScheduleByDay(date.getDay()).map(schedule => {
                    const direction = directions.find(d=>d.id === schedule.directionId)
                    if (!direction) return ''
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
    if (!direction) return 'Loading...'
    return (
        <div className={"schedule col-m-4 col-t-2 col-1"}>
            <div className="schedule-header">
                <span>{labelDate(date)}</span>
            </div>
            <div className='schedule-img' style={{backgroundImage: `url(${direction.img})`, backgroundSize: 'cover'}}/>
            <div className='schedule-details relative'>
                <h2>
                    {direction.name}
                </h2>
                <h2 className='pink'>
                    {addZero(hour)}:{addZero(minutes)}
                </h2>
                <p>
                    Преподаватель: { teacher?teacher.name: '' }
                </p>
                <div style={{paddingBottom: '200px'}}>
                    <button className='button absolute' style={{bottom: '20px'}}
                        onClick={()=>Router.push(`/price/${direction.id}`)}
                    >Записаться</button>
                </div>
            </div>
        </div>)
}

export default Schedule