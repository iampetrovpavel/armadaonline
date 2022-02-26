import { useState } from "react"
import useRequest from '../hooks/use-request'

const DirectionCart = ({direction}) => {
    const {name: directionName, description, img} = direction
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [trialForm, showTrialForm] = useState(false)
    const [successForm, showSuccessForm] = useState(false)
    function handleNameInput(e) {
        setName(e.target.value)
    }
    function handlePhoneInput(e) {
        const value = e.target.value
        const words = /\D{1}/
        if(words.test(value))return;
        setPhone(value)
    }
    const {doRequest, errors} = useRequest({
        url: '/api/orders/trial',
        method: 'post',
        body: {
            name, phone
        },
        onSuccess: (data) => {
            showSuccessForm(true)
        }
    })
    return (
                <div className="direction-cart" style={{backgroundImage: `url(${img})`, backgroundSize: 'cover'}}>
                    <div className="absolute" 
                        style={{
                            backgroundImage: 'url(/images/sobaka.jpg)', 
                            backgroundSize: 'cover',
                            top: successForm?'0px':'400px',
                            height:'400px',
                            width:'100%',
                            zIndex: '1',
                            transition: 'top 0.3s'
                        }}>
                        <h2 className='absolute blue card br-1' style={{bottom: '1em', left: '1em'}}>Мы вам скоро позвоним ;)</h2>
                    </div>
                    <div className='relative inline-block col-2 float-right direction-cart-drawer'
                        style={{height: '100%', padding: '2em', top: trialForm?'-400px':'0'}}>
                        <h2 style={{color: 'white'}}>{directionName}</h2>
                        <p className="direction-cart-description" style={{color: 'white'}}>
                            {description}
                        </p>
                        <button className="button direction-cart-button" style={{position: "absolute", bottom: '40px'}} onClick={()=>showTrialForm(true)}>Записаться</button>
                    </div>
                    <div className="direction-cart-trial" style={{top: trialForm?'0px':'400px'}}>
                        <span onClick={()=>showTrialForm(false)} className="close"/>
                        <h3>Ваше имя</h3>
                        <input value={name} onChange={handleNameInput}></input>
                        <h3>Номер телефона</h3>
                        <input value={phone} onChange={handlePhoneInput}></input>
                        {errors}
                        <button className="button" style={{position: 'absolute', bottom:'40px', left: '2em'}}
                            onClick={doRequest}
                        >
                            Хочу танцевать
                        </button>
                    </div>

                </div>
    )
}

export default DirectionCart