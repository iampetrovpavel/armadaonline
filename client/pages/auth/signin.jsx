import { useState} from "react";
import useRequest from '../../hooks/use-request'
import Router from 'next/router'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <div className="card mt-1 mb-1 px-3 py-2">
                    <form onSubmit={onSubmit}>
                        <h1 className="mt-0">Вход</h1>
                        <div className="mb-1">
                            <label className='form-label'>Email</label>
                        </div>
                        <div className='mb-1'>
                            <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="form-control"/>
                        </div>
                        <div className="mb-1">
                            <label className='form-label'>Пароль</label>
                        </div>
                        <div className="mb-1">
                            <input type='password' value={password} onChange={e => setPassword(e.target.value)} className='form-control'/>
                        </div>
                        {errors}
                        <div>
                            <button className='button button-filled' 
                                >{!loading && 'Войти'}{loading}</button>
                        </div>
                    </form>
            </div>
        </div>


    )
}

export default SignIn