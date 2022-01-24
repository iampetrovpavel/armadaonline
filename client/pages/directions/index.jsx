import { useState } from "react"
import data from '../../assets/data'
import Link from 'next/link'

import colors from '../../assets/colors'

const Directions = () => {
    const [selectedAge, setSelectedAge] = useState('all')
    const {ages, directions} = data
    
    return (
        <div className="row">
            <div className="col-12">
                <div className="row justify-content-center animate__animated animate__fadeIn">
                    <div className="col-12 col-sm-6 col-lg-4 square p-0">
                        <div className="square-content d-flex align-items-center justify-content-center">
                            <div style={{minWidth: "220px"}}>
                                <h2 className="fw-bolder">Возраст</h2>
                                <ul className="p-0 fs-5 directions-menu w-75">
                                    {Object.keys(ages).map(key=>(
                                        <li key={ages[key].name} 
                                            onClick={()=>setSelectedAge(key)} 
                                            className={"p-2 rounded-3 mb-1 " + ((key === selectedAge) && "directions-menu-selected")}
                                        >
                                            {ages[key].name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {directions
                        .filter(direction=>ages[selectedAge].directions.indexOf(direction.id)>-1)
                        .map(direction=>(
                            <div className="col-12 col-sm-6 col-lg-4 square p-0"
                                key={direction.id} 
                                style={{backgroundImage:`url(${direction.img})`, backgroundSize: 'cover'}}
                            >
                                <div className="square-content d-flex align-items-center" style={{overflow: "hidden"}}>
                                        <div className="circle-text fs-4 fw-bolder">
                                            <Link href={`/prices/[directionId]`} as={`/prices/${direction.id}`}>
                                                <a style={{textDecoration: "none", color: 'white'}}>
                                                    {direction.name}
                                                </a>
                                            </Link>
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