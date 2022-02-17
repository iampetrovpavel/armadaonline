import Link from 'next/link'
import Router from 'next/router'

const AdminLayout = ({children, url}) => {
    if (typeof window !== 'undefined') url = Router.pathname
    console.log(url)
    const menu = [
        {href: '/admin/tickets', label: 'Абонементы'},
        {href: '/admin/directions', label: 'Направления'},
        {href: '/admin/users', label: 'Пользователи'},
    ].map(item=><li key={item.href} style={{display: 'inline-block', padding: '10px', color:item.href === url? 'blue': 'black'}}>
        <Link href={item.href} style={{color:'blue'}}>
            {item.label}
        </Link>
    </li>)
    return (
        <div>
            <h2>Панель администратора</h2>
            <ul style={{display: 'block'}}>
                {menu}
            </ul>
            <hr/>
            {children}
        </div>
    )
}

export default AdminLayout