import { useState } from 'react'
import useRequest from '../hooks/use-request'
import colors from '../assets/colors'

const Banner = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState(null)
    const {doRequest} = useRequest({
        url:'/api/orders/trial',
        method: 'post',
        body: {
            name, phone
        },
        onSuccess: () => {
            setMessage(SUCCESS_MESSAGE)
            setName('')
            setPhone('')
        },
        onFail: (errors) => {
            ERROR_MESSAGE.text = errors.map(e=>e.message).join(' ')
            setMessage(ERROR_MESSAGE)
        }
    })
    const SUCCESS_MESSAGE = {title: 'Поздравляем!', text: 'Вы сделали первый шаг, наш менеджер свяжиться с вами в ближайшее время.'}
    const ERROR_MESSAGE = {title: 'Ошибка!', text: 'Произошла ошибка!'}
    return (
        <div className="banner">
            <SuccessMessage title={message && message.title} message={message && message.text} show={message} close={()=>{setMessage(null)}}/>
            <div className="container fs-5 fw-bold d-flex flex-column flex-lg-row justify-content-between">
                <div className="my-3 d-flex align-items-center justify-content-start">
                    <span>ЗАПИШИСЬ НА ПРОБНОЕ ЗАНЯТИЕ</span>
                </div>
                <div>
                    <input className="banner-input my-3" placeholder="Имя" value={name} onChange={(e)=>setName(e.target.value)}/>
                    <div className="d-none d-lg-inline-block" style={{width: '20px'}}></div>
                    <input className="banner-input my-3" placeholder="Телефон" value={phone} onChange={(e)=>setPhone(e.target.value)}/>          
                </div>
                <div>
                    <button className="banner-btn px-3 my-3 fw-bold" onClick={doRequest}>Записаться</button>
                </div>
            </div>
        </div>
    )
}

export default Banner

const SuccessMessage = ({title, message, show = false, close}) => (
    <div className="modal" tabIndex="-1" style={{display: show?'block':'none'}}>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={close}></button>
            </div>
            <div className="modal-body">
                <p>{message}</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={close} style={{background:colors.pink, border: 0}}>Закрыть</button>
            </div>
            </div>
        </div>
    </div>
)