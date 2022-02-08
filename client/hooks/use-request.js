import axios from 'axios'
import {useState} from "react";

const useRequest = ({ url, method, body, onSuccess, onFail}) => {
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(null)
    const doRequest = async (props = {}) => {
        try{
            setLoading(
                <div className="spinner-border" role='status'/>
            )
            setErrors(null)
            console.log("REQUEST ", url + (props.params || '') + (props.query || ''), body, props.body)
            const response = await axios[method](url + (props.params || '') + (props.query || ''), props.body || body)
            console.log("RESPONSE ",response.data)
            if(onSuccess){
                onSuccess(response.data)
            }
            return response.data
        }
        catch(error){
            if(!error.response || !error.response.data || !error.response.data.errors) {
                setErrors(
                    <div className='alert alert-danger'>
                        <h4>Ooopsss...</h4>
                        <ul className='my-0'>
                            <li>Что-то пошло не так...</li>
                        </ul>
                    </div>
                )
                if(onFail)onFail(error)
                return
            }
            setErrors(
                <div className='alert alert-danger'>
                    <h4>Ooopsss...</h4>
                    <ul className='my-0'>
                        {error.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)}
                    </ul>
                </div>
            )
            if(onFail)onFail(error.response.data.errors)
        }
        finally {
            setLoading(null)
        }
    }

    return {doRequest, errors, loading}
}

export default useRequest