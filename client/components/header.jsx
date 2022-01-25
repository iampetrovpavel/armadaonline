import Link from 'next/link'
import Image from 'next/image'
import {useRef} from 'react'
import colors from '../assets/colors'

const Header = ({currentUser}) => {
    const links = [
        !currentUser && {label:'Регистрация', href: '/auth/signup'},
        !currentUser && {label:'Вход', href: '/auth/signin'},
        currentUser && {label:'Выход', href: '/auth/signout'}
    ].filter(link => link)

    const menu = useRef()
    function toggleMenu(){
        if(menu.current.classList.contains('d-none')){
            menu.current.classList.remove('d-none')
        } else {
            menu.current.classList.add('d-none')
        }
    }
    function closeMenu() {
        menu.current.classList.add('d-none')
    }
    const s = {
        contacts: {
            color: colors.yellow,
            fontSize: '14px',
            // marginLeft: '20px'
        },
        wrapper: {
            background: '#48357C',
            // height: '130px',
            width: '100%'
        }
    }
    return (
        <div style={s.wrapper}>
            <div className='container d-flex justify-content-between flex-column flex-lg-row'>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex'>
                        <Link href='/'>
                            <div className='d-none d-lg-flex' style={{cursor: 'pointer'}}>
                                <Image  src="/imgs/logo.png" alt="me" width="200" height="120" />
                            </div>
                        </Link>
                        <Link href='/'>
                            <div  style={{background:colors.yellow, padding: '5px', marginLeft:'-12px', cursor: 'pointer'}} className='d-flex d-lg-none' >
                                    <Image src="/imgs/logo-bird-blue.png" priority={true} alt="me" width="60" height="60"/>
                            </div>
                        </Link>
                        <div className='h-100 d-flex justify-content-center flex-column p-2 p-lg-3 fs-6 fw-bolder' style={s.contacts}>
                            <span>+7(952)2465072</span>   
                            <span>г. Пушкин, ул. Глинки, д. 1</span>
                        </div>
                    </div>
                    <div style={{position: 'relative'}} className='d-block d-lg-none'>
                        <input id="menu__toggle" type="checkbox" />
                        <label className="menu__btn" htmlFor="menu__toggle" onClick={toggleMenu}>
                            <span></span>
                        </label>
                    </div>
                </div>
                <div ref={menu} className='header-menu d-none d-lg-flex align-items-center flex-column flex-lg-row mt-3 mt-lg-0 fs-5' onClick={closeMenu}>
                    <Link href='/'>
                        <a className='p-2 mb-lg-0 d-flex'>
                            Направления
                        </a>
                    </Link>
                    <Link href='/prices'>
                        <a className='p-2 mb-lg-0 d-flex'>
                            Цены
                        </a>
                    </Link>
                    <Link href='/schedule'>
                        <a className='p-2 mb-lg-0 d-flex'>
                            Расписание
                        </a>
                    </Link>
                    <Link href='/contacts'>
                        <a className='p-2 mb-lg-0 d-flex'>
                            Контакты
                        </a>
                    </Link>
                    {links.map(({label, href}) => (
                        <Link href={href} key={href}>
                            <a className='p-2 mb-lg-0 d-flex'>
                                {label}
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Header