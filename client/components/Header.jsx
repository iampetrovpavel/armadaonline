import Image from 'next/image'
import logo from '../images/logo.png'

const Header = ({currentUser}) => {
    console.log(currentUser)
    const selected = 1
    const menuItems = [
        {id: 1, href: '/', label: 'Направления'},
        {id: 2, href: '/', label: 'Цены'},
        {id: 3, href: '/schedule', label: 'Расписание'},
        {id: 4, href: '/', label: 'Контакты'},
        (currentUser && currentUser.groups && (currentUser.groups.indexOf('admin')!=-1)) && {id: 8, href: '/admin/tickets', label: 'Настройки', right: true},
        !currentUser && {id: 5, href: '/auth/signin', label: 'Вход', right: true},
        !currentUser && {id: 6, href: '/auth/signup', label: 'Регистрация', right: true},
        currentUser && {id: 7, href: '/auth/lk', label: 'Личный кабинет', right: true},
    ].filter(item=>item).map(item => (
            <li key={item.id} className={'' + (item.id === selected? ' selected': '') + (item.right?' float-right': ' float-left')} >
                <a href={item.href}>{item.label}</a>
            </li>
    ))
    const subMenuItems = [
        {id: 1, href: '/', label: 'Любое'},
        {id: 2, href: '/', label: 'Дети до 8 лет'},
        {id: 3, href: '/', label: 'От 10 до 18 лет'},
        {id: 4, href: '/', label: 'Взрослые'},
    ].map(item => (
            <li key={item.id} className={item.id === selected? 'selected': ''} style={{float: item.right?'right': 'left'}}>
                <a href={item.href}>{item.label}</a>
            </li>
    ))
    return (
        <div className='header-wrapper'>
            <div id='header-top'>
                <Image alt='logo' src={logo}/>
                <div id='header-contacts' className='row'>
                    <div className='row' style={{alignItems: 'center'}}>
                        <img src='images/phone.svg' alt='next' />
                        <span>
                            +79522486072
                        </span>
                    </div>
                    <div className='row' style={{alignItems: 'center'}}>
                        <img src='images/point.svg' alt='next' />
                        <span>
                            г. Пушкин, ул. Глинки д. 1
                        </span>
                    </div>
                    <img src='images/vk.svg' alt='next' />
                    <img src='images/instagram.svg' alt='next' />
                </div>
            </div>
            <div className="header">
                <ul className='menu'>
                    {menuItems}
                </ul>
                {/* <ul className='sub'>
                    {subMenuItems}
                </ul> */}
            </div>
        </div>
    )
}

export default Header
