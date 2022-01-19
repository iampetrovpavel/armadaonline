import { useState } from "react"
import colors from '../../assets/colors'

const Directions = () => {
    const [selectedAge, setSelectedAge] = useState('all')
    const directions = [
        {id:1, name: 'Чирхоп', img: '/imgs/directions/chirhop.jpg'},
        {id:2, name: 'Кавердэнс', img: '/imgs/directions/kaver.jpg'},
        {id:3, name: 'Балет', img: '/imgs/directions/balet.jpg'},
        {id:4, name: 'Стрип', img: '/imgs/directions/strip.jpg'},
        {id:5, name: 'Здоровая спина', img: '/imgs/directions/spina.png'},
        // {id:6, name: 'Индивидуальные', img: '/imgs/directions/individ.jpg'},
    ]
    const ages = {
        all: {name: 'Все', directions: [1,2,3,4,5,6]},
        from6to8: {name: 'От 6 до 8 лет', directions: [1,6]},
        from12to18: {name: 'От 12 до 18 лет', directions: [2,6]},
        from18: {name: 'Старше 18 лет', directions: [3,4,6]},
    }
    return (
        <div className="row">
            {/* <div className="col-12 col-sm-4 ">
                    <div className="d-flex justify-content-center align-items-center h-100 m-3 m-sm-0">
                        <div>
                            <h4 className="fw-bolder">Направления</h4>
                            <ul className="p-0 fs-6 directions-menu">
                                {Object.keys(ages).map(key=>(
                                    <li key={ages[key].name} 
                                        onClick={()=>setSelectedAge(key)} 
                                        className={"p-2 rounded-3 fw-bolder " + ((key === selectedAge) && "directions-menu-selected")}
                                    >
                                        {ages[key].name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
            </div> */}
            <div className="col-12">
                <div className="row justify-content-center animate__animated animate__fadeIn">
                    <div className="col-12 col-sm-6 col-lg-4 square p-0">
                        <div className="square-content d-flex flex-column">
                            <h4 className="fw-bolder">Направления</h4>
                            <ul className="p-0 fs-6 directions-menu">
                                {Object.keys(ages).map(key=>(
                                    <li key={ages[key].name} 
                                        onClick={()=>setSelectedAge(key)} 
                                        className={"p-2 rounded-3 fw-bolder " + ((key === selectedAge) && "directions-menu-selected")}
                                    >
                                        {ages[key].name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {directions
                        .filter(direction=>ages[selectedAge].directions.indexOf(direction.id)>-1)
                        .map(direction=>(
                            <div className="col-12 col-sm-6 col-lg-4 square p-0"
                                key={direction.id} 
                                style={{backgroundImage:`url(${direction.img})`, backgroundSize: 'cover'}}
                            >
                                <div className="square-content">
                                        <div className="circle-text fs-4 fw-bolder">
                                            {direction.name}
                                        </div>
                                        <div className="circle"></div>
                                </div>
                            </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Directions