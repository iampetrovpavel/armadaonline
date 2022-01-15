import { useState} from "react";
import useRequest from '../../hooks/use-request'
import Router from 'next/router'

const SignUp = () => {
    const [email, setEmail] = useState('test@test.ru')
    const [password, setPassword] = useState('dsfsdf!@#1223')
    const {doRequest, errors, loading} = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {email, password},
        onSuccess: () => Router.push('/')
    })

    const onSubmit = async e => {
        e.preventDefault()
        doRequest()
    }
    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className='mb-3'>
                <label className='form-label'>Email Address</label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="form-control"/>
            </div>
            <div className="mb-3">
                <label className='form-label'>Password</label>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)} className='form-control'/>
            </div>
            {errors}
            <button className='btn btn-primary'>{!loading && 'Sign Up'}{loading}</button>
        </form>
    )
}

export default SignUp