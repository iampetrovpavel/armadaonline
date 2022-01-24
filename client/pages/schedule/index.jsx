import data from '../../assets/data'
import colors from '../../assets/colors'
import { monthList } from '@iampetrovpavel/time'

const Schedule = () => {
    const {directions, lessons, users, groups} = data
    const now = new Date()
    const month = now.getMonth()
    const year = now.getFullYear()
    const datesCount = getDatesCount()
    const datesList = getDatesList(datesCount)
    const times = getTimes(lessons, month, year)
    const teachersGroup = groups.find(group => group.name === 'Преподаватель')
    const teachers = users.filter(user => user.groupsId.indexOf(teachersGroup.id) >= 0)
    const days = {0: 'ВС', 1: 'ПН', 2: 'ВТ', 3: 'СР', 4: 'ЧТ', 5: 'ПТ', 6: 'СБ'}

    const Direction = ({direction, teacher}) => (
        <td>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{direction.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{teacher}</h6>
                    {/* <a href="#" class="btn" style={{background: colors.green, border: 0, color: 'white'}}>Купить</a> */}
                </div>
            </div>
        </td>
    )

    const getRow = (date) => {
        const row = []
        const lessonsFromDate = getLessonsFromDate(year, month, date, lessons)
        if (lessonsFromDate.length === 0) return null
        times.map(time => {
            const lesson = lessonsFromDate.find(lesson => lesson.time.getTime() === time.getTime())
            if (!lesson) return row.push(<td></td>)
            const direction = directions.find(direction => direction.id === lesson.directionId)
            const teacher = teachers.find(teacher => lesson.teacherId === teacher.id)
            console.log(direction)
            if (direction) {
                row.push(<Direction direction={direction} teacher={teacher.name}/>)
            }
            else {
                row.push(<td></td>)
            }
        })
        const dayNumber = (new Date(year, month, date)).getDay()
        const day = days[dayNumber]
        return (
            <tr>
                <th>
                    <div style={{fontSize: '36px',  color: (dayNumber === 6 || dayNumber === 0)?colors.pink:colors.blue}}>
                        {day}
                    </div>
                    <div style={{fontSize: '18px',}}>{addZero(date.toString())}.{addZero((month+1).toString())}</div>
                </th>
                {row}
            </tr>
        )
    }
    
    return (
        <div className='pt-3 mb-3' style={{position: 'relative'}}>
            <h2>Расписание <span style={{color: colors.pink}}>{monthList[month]} {year}</span></h2>
            <div style={{overflowX: 'scroll'}}>
                <table className='schedule-table' style={{position:'sticky', top: '0px', zIndex:1}}>
                    <thead>
                        <tr style={{backgroundColor: colors.white, borderBottom: '1px solid #eae8e8'}}>
                            <th></th>
                            {times.map(
                                        time => <th style={{fontSize: '24px', width: '160px', minWidth: '160px'}}>
                                                {addZero(time.getHours().toString())}:{addZero(time.getMinutes().toString())}
                                            </th>
                            )}
                        </tr>
                    </thead>
                </table>
                <table className="schedule-table">
                    <tbody>
                        {datesList.map(date => getRow(date))}
                    </tbody>
                </table>
            </div>

        </div>

    )
}

const addZero = (str) => {
    let result = str
    if (str.length === 1){
        result = "0"+str
    }
    return result
}

const getDatesCount = () => {
    const date = new Date()
    date.setMonth((new Date()).getMonth()+1)
    date.setDate(0)
    return date.getDate()
}

const getDatesList = (daysCount) => {
    const datesList = []
    for (let i=1; i<=daysCount; i++) {
        datesList.push(i)
    }
    return datesList
}

const getTimes = (lessons, month, year) => {
    const times = []
    lessons.map(lesson => {
        if (times.find(time => 
                    lesson.time.getFullYear() !== year
                    || lesson.time.getMonth() !== month
                    || (time.getHours() === lesson.time.getHours() 
                    && time.getMinutes() === lesson.time.getMinutes())
                )
            ) {
            return
        }
        times.push(lesson.time)
    })
    return times
        .sort((a, b)=>((a.getHours()+a.getMinutes()/60) - (b.getHours()+b.getMinutes()/60)))
}

const getLessonsFromDate = (year, month, date, lessons) => {
    return lessons.filter(lesson => (
            lesson.time.getFullYear() === year
            && lesson.time.getMonth() === month
            && lesson.time.getDate() === date
        )
    )
}

// const getDirectionFromDate = (date, directions, lessons) => {
    
//     return directions.filter(direction => typeof direction.times.find(time => time.getDate() === date) !== 'undefined')
// }
const getDirectionFromTime = (time, directions) => {
    return directions.find(direction => {
        return typeof direction.times.find(directionTime => (
            (directionTime.getHours() === time.getHours()) && (directionTime.getMinutes() === time.getMinutes())
        )) !== 'undefined'

    })
}

export default Schedule