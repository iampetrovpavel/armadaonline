import { useEffect, useState } from 'react'
import Calendar from '../../components/Calendar'
import useLessons from  '../../hooks/use-lessons'

import useDirections from '../../hooks/use-directions'
import useUsers from '../../hooks/use-users'
import useSchedule from '../../hooks/use-schedule'
import AdminLayout from '../../components/AdminLayout'

import {addZero, formatTime} from '@iampetrovpavel/time'

const Lessons = () => {
    const [selected, setSelected] = useState(new Date())
    const [newLessonForm, showNewLessonForm] = useState(false)
    const [marks, setMarks] = useState([
       {date: new Date(), color: 'red'}
    ])
    useEffect(()=>{
        updateLessons(getFilter())
    }, [selected])
    function getFilter() {
        const min = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate(), selected.getHours()+3)
        const max = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate()+1, selected.getHours()+3)
        const filter = JSON.stringify({'$gte':min.toISOString().slice(0,10), '$lt':max.toISOString().slice(0,10)})
        return {params: '?date='+filter};
    }
    const { directions } = useDirections([])
    const { users } = useUsers([])
    const { schedule } = useSchedule([])
    const {lessons, updateLessons, createLesson, toggleStudent} = useLessons({manualFetch: true})
    function toggleShowNewForm(){
        showNewLessonForm(!newLessonForm)
    }
    return (
        <AdminLayout>
            <div className='row mt-1'>
                <div className='mr-1'>
                    <Calendar selected = {selected} setSelected = {setSelected} marks = {marks}/>
                </div>
                <div className='grow-2'>
                    {newLessonForm?<NewLesson
                        directions = {directions} 
                        users = {users} 
                        schedule = {schedule} 
                        date = {selected} 
                        updateLessons = {()=>{
                            toggleShowNewForm()
                            updateLessons(getFilter())
                        }} 
                        createLesson = {createLesson}
                    />:<button className='button button-filled mb-1' onClick={toggleShowNewForm}>Добавить занятие</button>}
                    {lessons.map(lesson => (
                        <Lesson
                            lessonId = {lesson.id}
                            direction = {directions.find(d=>d.id === lesson.directionId)}
                            date = {new Date(lesson.date)} 
                            key = {lesson.id} 
                            teacher = {users.find(u=>u.id === lesson.teacherId)}
                            students = {lesson.studentsId.map(s=>users.find(u=>u.id===s))}
                            updateLessons = {()=>{
                                updateLessons(getFilter())
                            }}
                            toggleStudent = {toggleStudent}
                        />
                    ))}
                </div>
            </div>
        </AdminLayout>
    )
}

export default Lessons

const Lesson = ({lessonId, updateLessons, toggleStudent, teacher = 'Неизвестный пользователь', date, direction = 'Неизвестно', students = []}) => {
    return (
        <div className='card row mb-1'>
            <div className='mr-1' 
            style={{
                backgroundImage: `url(${direction.img})`, 
                backgroundSize: 'cover',
                width:'100px',
                height:'100px'
            }}>
            </div>
            <table className='inline-block'>
                <tbody>
                    <tr>
                        <th>Направление</th>
                        <td>
                            {direction.name}
                        </td>
                    </tr>
                    <tr>
                        <th>Преподаватель</th>
                        <td>
                            {teacher.name}
                        </td>
                    </tr>
                    <tr>
                        <th>Время</th>
                        <td>{formatTime(date)}</td>
                    </tr>
                    <tr>
                        <th>Ученики</th>
                        <td>
                            <EditStudents toggleStudent = {toggleStudent} updateLessons={updateLessons} lessonId = {lessonId} students = {students}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

const EditStudents = ({students, toggleStudent, lesson, updateLessons, lessonId}) => {
    const { users } = useUsers([])
    const [usersList, showUsersList] = useState(false)
    console.log("STUDENTS ", students)
    function toggleShowUsersList(){showUsersList(!usersList)}
    function addStudent(e) {
        console.log("DATASET ", e.target.dataset)
        toggleStudent({
            body: {
                lessonId,
                update: [
                    {
                        field: 'studentsId', 
                        value: e.target.dataset.id, 
                        action: 'add'
                    }
                ]
            },
            onSuccess: updateLessons
        })
    }
    function removeStudent(e) {
        toggleStudent({
            body: {
                lessonId,
                update: [
                    {
                        field: 'studentsId', 
                        value: e.target.dataset.id, 
                        action: 'remove'
                    }
                ]
            },
            onSuccess: updateLessons
        })
    }
    return (
        <div>
            {usersList?
                <div className='card'>
                    <div>
                        Были на занятии:
                    </div>
                    {students.length === 0 && <div>Ни одного</div>}
                    <ul>
                        {students.map(student=><li onClick={removeStudent}><a data-id={student.id}>{student.name}</a></li>)}
                    </ul>
                    <div className='mt-1'>
                        Имеют абонемент:
                    </div>
                    {users.filter(u=>students.findIndex(s=>s.id===u.id)==-1).length === 0 && <div>Ни одного</div>}
                    <ul>
                        {users.filter(u=>students.findIndex(s=>s.id===u.id)==-1).map(user=><li onClick={addStudent}><a data-id={user.id}>{user.name}</a></li>)}
                    </ul>
                    <hr/>
                    <a onClick={toggleShowUsersList} className='mt-1'>Закрыть</a>
                </div>
                :<a onClick={showUsersList}>{students.length} чел</a>}
        </div>
    )
}

const NewLesson = ({date, createLesson, updateLessons, directions, users, schedule}) => {
    const day = date.getDay()
    const [directionId, setDirectionId] = useState('')
    const [teacherId, setTeacherId] = useState('')
    const [scheduleId, setScheduleId] = useState('')

    if(directions.length === 0) return 'Loading directions ...'
    if(users.length === 0) return 'Loading users ...'
    function handleChangeDirection(e) {
        setDirectionId(e.target.value)
    }
    function handleChangeTeacher(e) {
        setTeacherId(e.target.value)
    }
    function handleChangeSchedule(e) {
        setScheduleId(e.target.value)
    }
    function handleCreateLesson() {
        const selectedSchedule = schedule.find(s=>s.id === scheduleId)
        if(!selectedSchedule)return console.log('Schedule not found...');
        createLesson({
            body: {
                teacherId, directionId,
                date: new Date(
                    date.getFullYear(), 
                    date.getMonth(),
                    date.getDate(), 
                    selectedSchedule.hour, 
                    selectedSchedule.minutes)
            },
            onSuccess: updateLessons
        })
    }
    return (
        <div className='card mb-1' style={{maxWidth:'350px'}}>
            <table>
                <tbody>
                    <tr>
                        <th>Направление</th>
                        <td>
                            <select value={directionId} onChange={handleChangeDirection}>
                                <option value={''}>Выбрать</option>
                                {directions.map(direction => (
                                    <option value={direction.id}>{direction.name}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>Преподаватель</th>
                        <td>
                            <select value={teacherId} onChange={handleChangeTeacher}>
                                <option value={''}>Выбрать</option>
                                {users.filter(user => user.groups.indexOf('teacher')>-1).map( user => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>Время</th>
                        <td>
                            <select value={scheduleId} onChange={handleChangeSchedule}>
                                <option value={''}>Выбрать</option>
                                {schedule
                                    .filter(s => (s.directionId === directionId) && (s.day === day))
                                    .map( s => (
                                        <option key = {s.id} value={s.id}>{addZero(s.hour)}:{addZero(s.minutes)}</option>
                                    ))
                                }
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>
                            <button className='button button-filled' onClick={handleCreateLesson}>Добавить</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}