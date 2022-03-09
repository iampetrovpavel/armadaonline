import { useState } from "react"
import DirectionCart from "../components/DirectionCart"
import data from '../data'
import useDirections from "../hooks/use-directions"

const Directions = ({directions}) => {
    const [selected, Select] = useState(0)
    // const {directions} = useDirections()
    if (!directions) return 'Loading directions...'
    return (
        <div className="row">
            {directions.map(direction=>(
                <div key={direction.id} className="col-m-4 col-2 p-0">
                    <DirectionCart direction={direction}/>
                </div>
            ))}
        </div>
    )
}

export default Directions