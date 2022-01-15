import Link from 'next/link'
import Image from 'next/image'
import {useRef} from 'react'

const Header = ({currentUser}) => {
    const links = [
        !currentUser && {label:'Sign Up', href: '/auth/signup'},
        !currentUser && {label:'Sign In', href: '/auth/signin'},
        currentUser && {label:'Sign Out', href: '/auth/signout'}
    ]
        .filter(linkConfig => linkConfig)
        .map(({ label, href}) => (
            <li key={href} className='nav-item'>
                <Link href={href}>
                    <a className='nav-link'>{label}</a>
                </Link>
            </li>
        ))

    const menu = useRef()
    function toggleMenu(){
        console.log(menu.current)
        if(menu.current.classList.contains('d-none')){
            menu.current.classList.remove('d-none')
        } else {
            menu.current.classList.add('d-none')
        }
    }
    const c = {
        yellow: '#FFE600'
    }
    const s = {
        contacts: {
            color: c.yellow,
            fontSize: '14px',
            // marginLeft: '20px'
        },
        menu: {
            fontSize: '18px',
            color: c.yellow,
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
                <div className='d-flex'>
                    <div className='d-none d-lg-flex'>
                        <Image  src="/imgs/logo.png" alt="me" width="217" height="130" />
                    </div>
                    <div onClick={toggleMenu} style={{background:c.yellow, padding: '5px', marginLeft:'-12px'}} className='d-flex d-lg-none' >
                        <Image src="/imgs/logo-bird-blue.png" priority={true} alt="me" width="60" height="60"/>
                    </div>
                    <div className='h-100 d-flex justify-content-center flex-column p-3' style={s.contacts}>
                        <span>+7(952)2465072</span>   
                        <span>г. Пушкин, ул. Глинки, д. 1</span>
                    </div>
                </div>
                <div ref={menu} className='d-none d-lg-flex align-items-center flex-column flex-lg-row mt-3 mt-lg-0' style={s.menu}>
                    <div className='p-2'>НАПРАВЛЕНИЯ</div>
                    <div className='p-2'>РАСПИСАНИЕ</div>
                    <div className='p-2'>ЦЕНЫ</div>
                    <div className='p-2'>КОНТАКТЫ</div>
                    <Link href='/auth/signin'>
                        <a className='p-2 mb-3 mb-lg-0 d-flex'>
                            Вход
                            {/* <Image src="/imgs/signin.png" alt="me" width="27" height="27" /> */}
                        </a>
                    </Link>
                    <Link href='/auth/signup'>
                        <a className='p-2 mb-3 mb-lg-0 d-flex'>
                            Регистрация
                            {/* <Image src="/imgs/signin.png" alt="me" width="27" height="27" /> */}
                        </a>
                    </Link>
                </div>
            </div>
        </div>
        // <nav className='navbar navbar-dark bg-dark'>
        //     <Link href='/'>
        //         <a href="/"></a>
        //     </Link>
        //     <div className="flex justify-content-end">
        //         <ul className='nav d-flex align-items-center'>
        //             {links}
        //         </ul>
        //     </div>
        // </nav>
    )
}

export default Header