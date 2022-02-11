import { useState } from "react"
import DirectionCart from "../components/DirectionCart"

const Directions = () => {
    const [selected, Select] = useState(0)
    const subMenuItems = [
        {id: 1, href: '/', label: 'Любое', blocks: [0,1,2,3]},
        {id: 2, href: '/', label: 'Дети до 8 лет', blocks: [3]},
        {id: 3, href: '/', label: 'От 10 до 18 лет', blocks: [1]},
        {id: 4, href: '/', label: 'Взрослые', blocks: [0,2]},
    ]
    const blocks = [
        {name: 'Балет', description: 'Вид сценического искусства; спектакль, содержание которого воплощается в музыкально-хореографических образах.', img: '/images/balet.png', href: ''},
        {name: 'Кавердэнс', description: 'Вид сценического искусства; спектакль, содержание которого воплощается в музыкально-хореографических образах.', img: '/images/cover.png', href: ''},
        {name: 'Стрип пластика', description: 'Вид сценического искусства; спектакль, содержание которого воплощается в музыкально-хореографических образах.', img: '/images/strip.png', href: ''},
        {name: 'Чирхоп', description: 'Вид сценического искусства; спектакль, содержание которого воплощается в музыкально-хореографических образах.', img: '/images/chirhop.png', href: ''},
    ].filter((block, i) => {
        // console.log(subMenuItems[selected])
        return subMenuItems[selected].blocks.indexOf(i)>-1
    })
    return (
        <>
            <ul className='sub'>
                {subMenuItems.map((item, i) => (
                        <li key={item.id} className={i === selected? 'selected': ''} style={{float: item.right?'right': 'left'}}>
                            <a href="#" onClick={()=>Select(i)}>{item.label}</a>
                        </li>
                ))}
            </ul>
            <div className="row" style={{marginTop:'2px'}}>
                {blocks.map(direction=>< DirectionCart key={direction.name} direction={direction}/>)}
            </div>
        </>

    )
}

export default Directions