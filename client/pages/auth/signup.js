import { useState} from "react";
import useRequest from '../../hooks/use-request'
import Router from 'next/router'

const SignUp = () => {
    const [email, setEmail] = useState('test@test.ru')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('1212')
    const {doRequest, errors, loading} = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {email, password, name, admin: true},
        onSuccess: () => Router.push('/')
    })

    const onSubmit = async e => {
        e.preventDefault()
        doRequest()
    }
    return (
        <div className="card my-3 shadow animate__animated animate__jackInTheBox" style={{maxWidth: '800px', margin: '0 auto'}}>
            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <h1>Регистрация</h1>
                    <div className='mb-3'>
                        <label className='form-label'>ФИО</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control"/>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Email</label>
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <label className='form-label'>Пароль</label>
                        <input type='password' value={password} onChange={e => setPassword(e.target.value)} className='form-control'/>
                    </div>
                    {errors}
                    <button className='btn btn-primary' 
                        // style={{backgroundColor: colors.green, border: 'none'}}
                    >{!loading && 'Зарегистрироваться'}{loading}</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp