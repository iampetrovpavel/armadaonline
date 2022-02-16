import { useState } from "react"


const DirectionCart = ({direction}) => {
    const {name: directionName, description, img} = direction
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [trialForm, showTrialForm] = useState(false)
    function handleNameInput(e) {
        setName(e.target.value)
    }
    function handlePhoneInput(e) {
        const value = e.target.value
        const words = /\D{1}/
        if(words.test(value))return;
        setPhone(value)
    }
    return (
                <div className="direction-cart" style={{backgroundImage: `url(${img})`, backgroundSize: 'cover'}}>
                    <div className='inline-block col-2 float-right direction-cart-drawer'
                        style={{height: '100%', padding: '2em', top: trialForm?'-400px':'0'}}>
                        <h2 style={{color: 'white'}}>{directionName}</h2>
                        <p className="direction-cart-description" style={{color: 'white'}}>
                            {description}
                        </p>
                        <button className="button direction-cart-button" style={{bottom:40}} onClick={()=>showTrialForm(true)}>Записаться</button>
                    </div>
                    <div className="direction-cart-trial" style={{top: trialForm?'0px':'400px'}}>
                        <span onClick={()=>showTrialForm(false)} className="close"/>
                        <h3>Ваше имя</h3>
                        <input value={name} onChange={handleNameInput}></input>
                        <h3>Номер телефона</h3>
                        <input value={phone} onChange={handlePhoneInput}></input>
                        <div>
                            <button className="button" style={{bottom:40}}>Хочу танцевать</button>
                        </div>
                    </div>
                </div>
    )
}

export default DirectionCart