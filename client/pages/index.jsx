import { useState } from "react"
import DirectionCart from "../components/DirectionCart"
import data from '../data'
import useDirections from "../hooks/use-directions"

const Directions = () => {
    const [selected, Select] = useState(0)
    const {directions} = useDirections()
    // const subMenuItems = [
    //     {id: 1, href: '/', label: 'Любое', blocks: [0,1,2,3]},
    //     {id: 2, href: '/', label: 'Дети до 8 лет', blocks: [3]},
    //     {id: 3, href: '/', label: 'От 10 до 18 лет', blocks: [1]},
    //     {id: 4, href: '/', label: 'Взрослые', blocks: [0,2]},
    // ]
    // const blocks = directions.filter((block, i) => {
    //     return subMenuItems[selected].blocks.indexOf(i)>-1
    // })
    if (directions.length === 0) return 'Loading...'
    return (
        <>
            {/* <div>
                <ul className='sub mb-1'>
                    {subMenuItems.map((item, i) => (
                            <li key={item.id} className={i === selected? 'selected shadow': 'shadow'} style={{float: item.right?'right': 'left'}}>
                                <a onClick={()=>Select(i)}>{item.label}</a>
                            </li>
                    ))}
                </ul>
            </div> */}
            <div className="row">
                {directions.map(direction=>(
                    <div key={direction.id} className="col-m-4 col-2 p-0 animate__animated animate__flipInY">
                        <DirectionCart direction={direction}/>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Directions