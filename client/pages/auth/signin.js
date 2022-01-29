import { useState} from "react";
import useRequest from '../../hooks/use-request'
import Router from 'next/router'

const SignIn = () => {
    const [email, setEmail] = useState('test@test.ru')
    const [password, setPassword] = useState('dsfsdf!@#1223')
    const {doRequest, errors, loading} = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {email, password},
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
                    <h1>Вход</h1>
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
                    >{!loading && 'Войти'}{loading}</button>
                </form>
            </div>
        </div>

    )
}

export default SignIn