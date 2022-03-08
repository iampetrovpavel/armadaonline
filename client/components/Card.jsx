import Router from 'next/router'
import { addZero } from '@iampetrovpavel/time'

const Card = ({className, title, teacher, label, img, directionId, hour, minutes}) => {
    return (
        <div className={"schedule " + className}>
            <div className="schedule-header">
                <span>{label}</span>
            </div>
            <div className='schedule-img' style={{backgroundImage: `url(${img})`, backgroundSize: 'cover'}}/>
            <div className='schedule-details relative'>
                <h2>
                    {title}
                </h2>
                <h2 className='pink'>
                    {addZero(hour)}:{addZero(minutes)}
                </h2>
                <p>
                    Преподаватель: { teacher.name }
                </p>
                <div style={{paddingBottom: '200px'}}>
                    <button className='button absolute' style={{bottom: '20px'}}
                        onClick={()=>Router.push(`/price/${directionId}`)}
                    >Записаться</button>
                </div>
            </div>
        </div>
    )
}

export default Card