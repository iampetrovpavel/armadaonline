import useCalendar from '../hooks/use-calendar'
import {dayList, monthList, getClearDate} from '@iampetrovpavel/time'

const Calendar = ({selected = new Date(), setSelected, marks}) => {
    const now = new Date();
    const {dates, handleChangeYear, handleChangeMonth, handleSelect, handleSelectNow} = useCalendar(selected, setSelected)
    function getMarkColor(date) {
        for (let i = 0; i < marks.length; i++) {
            if( getClearDate(marks[i].date).getTime() === getClearDate(date).getTime()) {
                return marks[i].color
            }
        }
        return ''
    }
    return (
        <div className='card inline-block'>
            <select className='mr-1' value={selected.getMonth()} onChange = {handleChangeMonth}>
                {monthList.map((month, i) => (
                    <option key = {month} value = {i}>{month}</option>
                ))}
            </select>
            <select className='mr-1' value={selected.getFullYear()} onChange = {handleChangeYear}>
                <option value = {now.getFullYear()}>{now.getFullYear()}</option>
                <option value = {now.getFullYear() + 1}>{now.getFullYear()+1}</option>
            </select>
            <a style={{display: 'inline'}} onClick = {handleSelectNow}>Сегодня</a>
            <div className='calendar mt-1'>
                {dayList.map(day => <div className='calendar-header' key = {day}>{day}</div>)}
                {dates.map(date => (
                    <div className={
                            (date?'calendar-item ':' ') + 
                            (date && (selected.getDate() === date.getDate()?'calendar-selected ':' '))
                        }
                        style = {{
                            color: date?getMarkColor(date):''
                        }}
                        key={date + Math.random().toString()}
                        data-value = {date?date.toISOString():null}
                        onClick = {date?handleSelect:null}
                    >
                        {date?date.getDate():''}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Calendar;