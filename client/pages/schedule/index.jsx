import data from '../../assets/data'
import colors from '../../assets/colors'

const Schedule = () => {
    const {directions} = data
    const datesCount = getDatesCount()
    const datesList = getDatesList(datesCount)
    const times = getTimes(directions)
    const days = {0: 'ВС', 1: 'ПН', 2: 'ВТ', 3: 'СР', 4: 'ЧТ', 5: 'ПТ', 6: 'СБ'}
    const now = new Date()
    const month = now.getMonth()
    const year = now.getFullYear()

    const Direction = ({direction}) => (
        <td>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{direction.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{direction.teacher}</h6>
                    {/* <a href="#" class="btn" style={{background: colors.green, border: 0, color: 'white'}}>Купить</a> */}
                </div>
            </div>
        </td>
    )

    const getRow = (date) => {
        const row = []
        const directionsFromDate = getDirectionFromDate(date, directions)
        times.map(time => {
            const direction =getDirectionFromTime(time, directionsFromDate)
            if (direction) {
                row.push(<Direction direction={direction}/>)
            }
            else {
                row.push(<td></td>)
            }
        })
        if (directionsFromDate.length === 0) return null
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
        <div className='pt-3 mb-3'>
            <h2>Расписание</h2>
            <table className="schedule-table">
                <thead>
                    <tr>
                        <th></th>
                        {times.map(time => <th style={{fontSize: '24px'}}>{time.getHours()}:{time.getMinutes()}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {datesList.map(date => getRow(date))}
                </tbody>
            </table>
        </div>

    )
}

const addZero = (str) => {
    console.log(str)
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

const getTimes = (directions) => {
    const times = []
    directions.map(direction => {
        direction.times.map(directionTime => {
            if (times.find(time => time.getHours() === directionTime.getHours() && time.getMinutes() === directionTime.getMinutes())) {
                return
            }
            times.push(directionTime)
        })
    })
    return times
        .sort((a, b)=>((a.getHours()+a.getMinutes()/60) - (b.getHours()+b.getMinutes()/60)))
}

const getDirectionFromDate = (date, directions) => {
    return directions.filter(direction => typeof direction.times.find(time => time.getDate() === date) !== 'undefined')
}
const getDirectionFromTime = (time, directions) => {
    return directions.find(direction => {
        return typeof direction.times.find(directionTime => (
            (directionTime.getHours() === time.getHours()) && (directionTime.getMinutes() === time.getMinutes())
        )) !== 'undefined'

    })
}

export default Schedule