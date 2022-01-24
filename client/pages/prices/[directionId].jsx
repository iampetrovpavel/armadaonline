import { useState } from 'react'
import data from '../../assets/data'
import colors from '../../assets/colors'

const Prices = ({direction}) => {
    const [selectedDirection, setSelectedDirection] = useState(direction.id || data.directions[0].id)
    const {tickets, directions} = data
    return (
    <div className="row">
        <div className="col-12 col-md-4 col-lg-3 justify-content-center p-0"
            style={{backgroundImage:`url(${directions.find(d=>d.id===selectedDirection).img})`, backgroundSize: 'cover'}}
        >
            <div style={{backgroundColor:`rgba(250, 230, 0, 0.7)`}}>
                <div className='mt-4 p-3'>
                    <h2 className="fw-bolder">Направления</h2>
                    <ul className="p-0 fs-5 prices-menu w-75">
                        {directions.map(direction=>(
                            <li key={direction.id} 
                                onClick={()=>setSelectedDirection(direction.id)} 
                                className={"p-1 rounded-3 mb-1 " + ((direction.id === selectedDirection) && "prices-menu-selected")}
                            >
                                {direction.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
        <div className="col-12 col-md-8 col-lg-9">
            <div className='row'>
                {tickets
                        .filter(ticket=>ticket.directionId === selectedDirection).sort((a, b)=>a.order - b.order)
                        .map(ticket=>(
                            <div className="col-12 col-lg-6 p-2"
                                key={ticket.id} 
                            >
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">{ticket.title}</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">{ticket.description}</h6>
                                        <p class="card-text fs-3 fw-bolder" style={{color: colors.green}}>{ticket.price} руб</p>
                                        <a href="#" class="btn" style={{background: colors.green, border: 0, color: 'white'}}>Купить</a>
                                    </div>
                                </div>
                            </div>
                    ))}
            </div>
        </div>
    </div>
    )
}

Prices.getInitialProps = async (context, client) => {
    const { directionId } = context.query
    const {directions} = data
    const direction = directions.find(d=>d.id == directionId)
    console.log("DEBUG ", direction)
    return {direction}
}

export default Prices