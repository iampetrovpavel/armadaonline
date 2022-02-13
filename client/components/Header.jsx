import Image from 'next/image'
import { useEffect, useState } from 'react'
import logo from '../images/logo.png'

const Header = ({currentUser, url}) => {
    const selected = 4
    const [burger, showBurger] = useState(true)
    const [hide, setHide] = useState(false)
    const [hide2, setHide2] = useState(false)

    const menuItems = [
        {id: 1, href: '/', label: 'Направления'},
        {id: 2, href: '/price', label: 'Цены'},
        {id: 3, href: '/schedule', label: 'Расписание'},
        {id: 4, href: '/contacts', label: 'Контакты'},
        (currentUser && currentUser.groups && (currentUser.groups.indexOf('admin')!=-1)) && {id: 8, href: '/admin/tickets', label: 'Настройки', right: true},
        !currentUser && {id: 5, href: '/auth/signin', label: 'Вход', right: true},
        !currentUser && {id: 6, href: '/auth/signup', label: 'Регистрация', right: true},
        currentUser && {id: 7, href: '/auth/lk', label: 'Личный кабинет', right: true},
    ].filter(item=>item).map((item, i) => (
            <li 
                key={item.id}
                className={'' + (item.href === url? ' selected': '') 
                    + (item.right?' float-right': ' float-left') 
                    + (!burger && item.id !== selected?' animate__animated animate__backOutRight':' block')
                } 
                style={{display: (hide2 && item.id !== selected)?'none':'block',
                        top: (item.id === selected && !burger && !hide2)?(`-${i*40}px`):'0',
                        transition: (item.id === selected && !burger && hide2)?'none':'top 0.3s',

                }}
            >
                    <a href={item.href}>{item.label}</a>
            </li>
    ))
    function toggleBurger() {
        if(burger){
            setTimeout(()=>{
                setHide(true)
            }, 500)
            setTimeout(()=>{
                setHide2(true)
            }, 700)
        } else {
                setHide(false)
                setHide2(false)
        }
        showBurger(!burger)
    }
    return (
        <div className='header-wrapper'>
            <div id='header-top' style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{minWidth: '231px'}}>
                    <Image alt='logo' src={logo} width="231px" height="95px"/>
                </div>
                <div id='header-contacts' className='d-m-none' style={{flexWrap: 'wrap'}}>
                    <div className='col col-t-4' style={{alignItems: 'center', display: 'flex', justifyContent: 'flex-end'}}>
                        <img src='/images/phone.svg' alt='next' />
                        <span>
                            +7(952)248-60-72
                        </span>
                    </div>
                    <div className='col col-t-4' style={{alignItems: 'center', display: 'flex', justifyContent: 'flex-end'}}>
                        <img src='/images/point.svg' alt='next' />
                        <span>
                            г. Пушкин, ул. Глинки д. 1
                        </span>
                    </div>
                    <div className='col col-t-1 d-t-none'>
                        <img src='/images/vk.svg' alt='VK' height='25'/>
                        <img src='/images/instagram.svg' alt='Instagram' height='25'/>
                    </div>
                </div>
                <div id="burger">
                    <input id="menu__toggle" type="checkbox" checked={burger} onChange={()=>{}}/>
                    <label className="menu__btn" htmlFor="menu__toggle"  onClick={toggleBurger}>
                        <span></span>
                    </label>
                </div>
            </div>
            <div className="header">
                <ul className='menu' style={{maxHeight: hide?'40px':'200px',}}>
                    {menuItems}
                </ul>
            </div>
        </div>
    )
}

export default Header
