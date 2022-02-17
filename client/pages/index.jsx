import { useState } from "react"
import DirectionCart from "../components/DirectionCart"
import data from '../data'

const Directions = () => {
    const [selected, Select] = useState(0)
    const {directions = []} = data
    const subMenuItems = [
        {id: 1, href: '/', label: 'Любое', blocks: [0,1,2,3]},
        {id: 2, href: '/', label: 'Дети до 8 лет', blocks: [3]},
        {id: 3, href: '/', label: 'От 10 до 18 лет', blocks: [1]},
        {id: 4, href: '/', label: 'Взрослые', blocks: [0,2]},
    ]
    const blocks = directions.filter((block, i) => {
        return subMenuItems[selected].blocks.indexOf(i)>-1
    })
    return (
        <>
            <div>
                <ul className='sub'>
                    {subMenuItems.map((item, i) => (
                            <li key={item.id} className={i === selected? 'selected': ''} style={{float: item.right?'right': 'left'}}>
                                <a href="#" onClick={()=>Select(i)}>{item.label}</a>
                            </li>
                    ))}
                </ul>
            </div>
            <div className="row" style={{marginTop:'2px'}}>
                {blocks.map(direction=>(
                    <div key={direction.name} className="col-m-4 col-2 p-0">
                        < DirectionCart direction={direction}/>
                    </div>
                ))}
            </div>
        </>

    )
}

export default Directions