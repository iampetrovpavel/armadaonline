import { useState } from "react"


const DirectionCart = ({direction}) => {
    const {name, description, img} = direction
    const [trialForm, showTrialForm] = useState(false)
    return (
            <div className="col-t-4 col-2" style={{padding: '0em', position: 'relative'}}>
                <div className="direction-cart" style={{backgroundImage: `url(${img})`, backgroundSize: 'cover'}}>
                    <div className='inline-block col-2 float-right direction-cart-drawer'
                        style={{height: '100%', padding: '2em', top: trialForm?'-400px':'0'}}>
                        <h1 style={{color: 'white'}}>{name}</h1>
                        <p className="direction-cart-description" style={{color: 'white'}}>
                            {description}
                        </p>
                        <button className="direction-cart-button" onClick={()=>showTrialForm(true)}>Записаться</button>
                    </div>
                    <div className="direction-cart-trial" style={{top: trialForm?'0px':'400px'}}>
                        <span onClick={()=>showTrialForm(false)} className="close"/>
                        <h3>Ваше имя</h3>
                        <input></input>
                        <h3>Номер телефона</h3>
                        <input></input>
                        <div>
                            <button>Хочу танцевать</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default DirectionCart