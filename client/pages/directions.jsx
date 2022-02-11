import DirectionCart from "../components/DirectionCart"

const Directions = () => {
    const blocks = [
        {name: 'Балет', description: 'Вид сценического искусства; спектакль, содержание которого воплощается в музыкально-хореографических образах.', img: '/images/balet.png', href: ''},
        {name: 'Кавердэнс', description: 'Вид сценического искусства; спектакль, содержание которого воплощается в музыкально-хореографических образах.', img: '/images/cover.png', href: ''},
        {name: 'Стрип пластика', description: 'Вид сценического искусства; спектакль, содержание которого воплощается в музыкально-хореографических образах.', img: '/images/strip.png', href: ''},
        {name: 'Чирхоп', description: 'Вид сценического искусства; спектакль, содержание которого воплощается в музыкально-хореографических образах.', img: '/images/chirhop.png', href: ''},
    ]
    return (
        <div className="row">
            {blocks.map(direction=>< DirectionCart key={direction.name} direction={direction}/>)}
        </div>
    )
}

export default Directions