import Image from 'next/image'
import { useEffect, useState } from 'react'
import logo from '../images/logo.png'
import Vk from '../public/images/vk.svg'
import Instagram from '../public/images/instagram.svg'
import useDirections from '../hooks/use-directions'

const Header = ({currentUser, url}) => {
    const [burger, showBurger] = useState(true)
    const [hide, setHide] = useState(false)
    const [hide2, setHide2] = useState(false)
    const {directions} = useDirections()
    useEffect(()=>{
        function handleResize() {
            if (window.innerWidth > 600) {
                setHide(false)
                setHide2(false)
                showBurger(true)
            }
        }
        window.addEventListener("resize", handleResize);
        return ()=>{
            window.removeEventListener("resize", handleResize)
        }
    },[])

    const menuItems = [
        {id: 0, href: '/', label: 'Направления'},
        {id: 1, href: `/price/${(directions.length>0?directions[0].id:'')}`, label: 'Цены'},
        {id: 2, href: '/schedule', label: 'Расписание'},
        {id: 3, href: '/contacts', label: 'Контакты'},
        (currentUser && currentUser.groups && (currentUser.groups.indexOf('admin')!=-1)) && {id: 8, href: '/admin/tickets', label: 'Настройки', right: true},
        !currentUser && {id: 5, href: '/auth/signin', label: 'Вход', right: true},
        !currentUser && {id: 6, href: '/auth/signup', label: 'Регистрация', right: true},
        currentUser && {id: 7, href: '/auth/lk', label: 'Личный кабинет', right: true},
    ]

    const item = menuItems.filter(item=>item).find((item, i) => url === item.href)
    const selected = item && item.id

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

    function getClass(item) {
        return '' + (item.href === url? ' selected': '') 
        + (item.right?' float-right': ' float-left') 
        + (!burger && item.id !== selected?' animate__animated animate__backOutRight':' block')
    }
    function getStyle(item, i) {
        return {display: (hide2 && item.id !== selected)?'none':'block',
            top: (item.id === selected && !burger && !hide2)?(`-${i*40}px`):'0',
            transition: (item.id === selected && !burger && hide2)?'none':'top 0.3s',
        }
    }
    return (
        <div className='header-wrapper'>
            <div id='header-top' className='px-t-1 p-m-0'  style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{minWidth: '178px'}}>
                    <Image alt='logo' src={logo} width="178px" height="95px"/>
                </div>
                <div id='header-contacts' className='' style={{flexWrap: 'wrap', alignItems:'center'}}>
                    <div className='col col-t-4' style={{alignItems: 'center', display: 'flex', justifyContent: 'flex-start'}}>
                        <img src='/images/phone.svg' className='mr-1' alt='next'/>
                        <span className='mr-1 m-t-0'>
                            +7(952)248-60-72
                        </span>
                    </div>
                    <div className='col col-t-4' style={{alignItems: 'center', display: 'flex', justifyContent: 'flex-end'}}>
                        <img className='mr-1' src='/images/point.svg' alt='next' />
                        <span>
                            г. Пушкин, ул. Глинки д. 1
                        </span>
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
                <ul className='menu' style={{maxHeight: hide?'40px':'240px',}}>
                    <li className='float-right block d-t-none'>
                        <a href='https://vk.com/dallas_dance'>
                            <Vk className='svg-white' style={{top:'3px'}}/>
                        </a>
                    </li>
                    <li className='float-right block d-t-none'>
                        <a href='https://www.instagram.com/dance_dallas'>
                            <Instagram className='svg-white' style={{top:'5px'}}/>
                        </a>
                    </li>
                    {menuItems.filter(item=>item).map((item, i) => (
                            <li key={item.id}
                                className={getClass(item)} 
                                style={getStyle(item, i)}
                            >
                                    <a href={item.href} style={{display: 'block'}}>
                                        {item.label}
                                    </a>
                            </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Header
