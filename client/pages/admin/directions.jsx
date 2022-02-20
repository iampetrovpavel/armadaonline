import { useState, useEffect } from "react"
import  useRequest from '../../hooks/use-request'
import AdminLayout from '../../components/AdminLayout'
import {weekDaysShort} from '@iampetrovpavel/time'
import useDirections from '../../hooks/use-directions'
import useUsers from '../../hooks/use-users'
import useSchedule from '../../hooks/use-schedule'
import {dayList} from '@iampetrovpavel/time'

const Directions = ({url}) => {
    const {directions, updateDirections} = useDirections()
    return (
        <AdminLayout url = {url}>
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
        <div className="block mt-1">
            <li className='admin-direction-item card'>
                <div className='admin-direction-title'>
                    <span className="mr-1">{direction.name}</span>
                    <a className='admin-direction-schedule-button' onClick={()=>showSchedule(!schedule)}>{schedule?'Закрыть':'Расписание'}</a>
                </div>
                {schedule && <Schedule directionId= {direction.id}/>}
            </li>
        </div>

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
                    {schedule.map(s=><li key={s.id} className='mt-1'>
                        <span className="mr-1">{dayList[s.day]}</span> 
                        <span className="">{s.hour}:</span>
                        <span className="mr-1">{s.minutes}</span>
                        <a className="inline-block" onClick={()=>{deleteSchedule({params:'/'+s.id})}}>Удалить</a>
                    </li>)}
                </ul>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>День недели</th>
                        <td>
                            <select value={day} onChange={(e)=>setDay(e.target.value)}>
                                {weekDaysShort.map((day, i)=><option key={day} value={i}>{day}</option>)}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>Время</th>
                        <td>
                            <input style={{maxWidth:'40px'}} value={hour} onChange={(e)=>setHour(e.target.value)}></input>
                            <span>ч</span>
                            <input style={{maxWidth:'40px'}} value={minutes} onChange={(e)=>setMinutes(e.target.value)}></input>
                            <span>мин</span>
                        </td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>
                            <button className="button button-filled" onClick={()=>{createSchedule({body: {day, hour, minutes, directionId}})}}>Добавить</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* <div>
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
            </div> */}
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
        <table>
            <tbody>
                <tr>
                    <th>Название</th>
                    <td>
                        <input value={name} onChange={(e)=>setName(e.target.value)}></input>
                    </td>
                </tr>
                <tr>
                    <th>Описание</th>
                    <td>
                        <input value={description} onChange={(e)=>setDescription(e.target.value)}></input>
                    </td>
                </tr>
                <tr>
                    <th>Преподаватель</th>
                    <td>
                        <select value={teacherId} onChange={(e)=>setTeacherId(e.target.value)}>
                            {users
                                .map(user=>(
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <th></th>
                    <td>
                        <select value={img} onChange={(e)=>setImg(e.target.value)}>
                            {imgs.map(img=><option value={img}>{img}</option>)}
                        </select>
                    </td>            
                </tr>
                <tr>
                    <th></th>
                    <td>
                        {errors}
                        <button className='button button-filled' onClick={doRequest}>Создать</button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Directions