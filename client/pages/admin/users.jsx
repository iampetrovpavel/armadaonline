import { useEffect, useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import useRequest from '../../hooks/use-request'

const Users = () => {
    const [users, setUsers] = useState([])
    const {doRequest} = useRequest({
        url: '/api/users',
        method: 'get',
        onSuccess: (data)=>{
            setUsers(data)
        }
    })
    useEffect(()=>{
        doRequest()
    }, [])
    return (
        <AdminLayout>
            <ul>
                {users.map((user)=>(<li key={user.id}>
                        {user.name}
                        {user.groups && <div>Groups: <ul>
                                {user.groups.map(group=><li key={group}>{group}</li>)}
                            </ul></div>}
                        <SetTecherButton user = {user} onSuccess={doRequest}/>
                    </li>))}
            </ul>
        </AdminLayout>
    )
}

export default Users

const SetTecherButton = ({user, onSuccess}) => {
    let add = user.groups.indexOf('teacher')<0
    const {doRequest} = useRequest({
        url: '/api/users',
        method: 'put',
        body: {
            userId: user.id,
            update: [
                {
                    field: 'groups', value: 'teacher', 
                    action: add?'add':'remove'
                }
            ]
        },
        onSuccess
    })
    return (
        <button onClick={doRequest}>{add?'Set techer':'Remove from Teachers'}</button>
    )
}