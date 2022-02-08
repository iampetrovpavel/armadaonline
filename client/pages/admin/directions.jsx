import { useState, useEffect } from "react"
import  useRequest from '../../hooks/use-request'
import AdminLayout from '../../components/AdminLayout'
import {weekDaysShort} from '@iampetrovpavel/time'
import useDirections from '../../hooks/use-directions'
import useUsers from '../../hooks/use-users'
import useSchedule from '../../hooks/use-schedule'

const Directions = () => {
    const {directions, updateDirections} = useDirections()
    return (
        <AdminLayout>
            <div>
                <CreateDirection updateDirections = {updateDirections}/>
                <hr/>
                <ul>
                    {directions.map((direction)=>(
                        <Direction key={direction.id} direction={direction}/>
                    ))}
                </ul>
            </div>
        </AdminLayout>
    )
}

const Direction = ({direction}) => {
    const [schedule, showSchedule] = useState(false)
    return (
        <li className='admin-direction-item'>
            <div className='admin-direction-title'>
                {direction.name} | {direction.description}
                <button className='admin-direction-schedule-button' onClick={()=>showSchedule(!schedule)}>{schedule?'Закрыть':'Расписание'}</button>
            </div>
            {schedule && <Schedule directionId= {direction.id}/>}
        </li>
    )
}

const Schedule = ({directionId, updateDirections}) => {
    const [day, setDay] = useState(0)
    const [hour, setHour] = useState(0)
    const [minutes, setMinutes] = useState(0)

    const { schedule, createSchedule, deleteSchedule } = useSchedule(directionId)

    return (
        <div className='admin-direction-schedule'>
            <div>
                <ul>
                    {schedule.map(s=><li key={s.id}>
                        {s.day} | {s.hour} | {s.minutes} | <button onClick={()=>{deleteSchedule({params:'/'+s.id})}}>Delete</button>
                    </li>)}
                </ul>
            </div>
            <div>
                <span>День недели</span>
                <select value={day} onChange={(e)=>setDay(e.target.value)}>
                    {weekDaysShort.map((day, i)=><option key={day} value={i}>{day}</option>)}
                </select>
                <span>Время</span>
                <input value={hour} onChange={(e)=>setHour(e.target.value)}></input>
                <span>ч</span>
                <input value={minutes} onChange={(e)=>setMinutes(e.target.value)}></input>
                <span>мин</span>
                <button onClick={()=>{createSchedule({body: {day, hour, minutes, directionId}})}}>Добавить</button>
            </div>
        </div>
    )
}

const CreateDirection = ({updateDirections}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [teacherId, setTeacherId] = useState()
    const [img, setImg] = useState('/images/default.jpg')

    const {users = []} = useUsers({groups: 'teacher'})
    useEffect(() => {
        if(users.length>0) setTeacherId(users[0].id)
    }, [users])

    const {doRequest, errors} = useRequest({
        url: '/api/directions',
        method: 'post',
        body: {name, description, teacherId, img},
        onSuccess: () => {
            updateDirections()
        }
    })
    const imgs = ['/images/default.jpg', '/images/balet.png', '/images/chirhop.png', '/images/cover.png', '/images/strip.png']
    return (
        <div>
            <span>Название</span>
            <input value={name} onChange={(e)=>setName(e.target.value)}></input>
            <span>Описание</span>
            <input value={description} onChange={(e)=>setDescription(e.target.value)}></input>
            <span>Преподаватель</span>
            <select value={teacherId} onChange={(e)=>setTeacherId(e.target.value)}>
                {users
                    .map(user=>(
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
            <select value={img} onChange={(e)=>setImg(e.target.value)}>
                <option value='/images/default.jpg'>/images/default.jpg</option>
                <option value='/images/balet.png'>/images/balet.png</option>
                <option value='/images/chirhop.png'>/images/chirhop.png</option>
                <option value='/images/cover.png'>/images/cover.png</option>
                <option value='/images/strip.png'>/images/strip.png</option>
            </select>
            {errors}
            <button onClick={doRequest}>Create</button>
        </div>
    )
}

export default Directions