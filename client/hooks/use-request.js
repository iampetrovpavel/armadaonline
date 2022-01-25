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
            console.log(url, body)
            const response = await axios[method](url, body)
            console.log("RESPONSE ",response.data)
            if(onSuccess){
                onSuccess(response.data)
            }
            return response.data
        }
        catch(error){
            if(!error.response || !error.response.data || !error.response.data.errors) return console.log(error)
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