import Router from 'next/router'

const Lk = () => {
    return (
        <button onClick={()=>Router.push('/auth/signout')}>Выход</button>
    )
}

export default Lk