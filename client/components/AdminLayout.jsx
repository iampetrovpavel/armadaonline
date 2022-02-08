import Link from 'next/link'

const AdminLayout = ({children}) => {
    const menu = [
        {href: '/admin/tickets', label: 'Абонементы'},
        {href: '/admin/directions', label: 'Направления'},
        {href: '/admin/users', label: 'Пользователи'},
    ].map(item=><li key={item.href} style={{display: 'inline-block', padding: '10px'}}>
        <Link href={item.href}>{item.label}</Link>
    </li>)
    return (
        <div>
            <h2>Admin panel</h2>
            <ul style={{display: 'block'}}>
                {menu}
            </ul>
            <hr/>
            {children}
        </div>
    )
}

export default AdminLayout