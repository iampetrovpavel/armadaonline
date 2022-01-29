import Link from 'next/link'

const Footer = () => {
    const directions = [
        {href:'/', }
    ]
    return (
        <div className="footer">
            <div className='container'>
                <div className="row">
                    <div className="col-m-4 col-t-2 col-1">
                        <h4>Контакты</h4>
                        <p>
                            г. Пушкин, ул. Глинки, д. 1
                            тел. +7(952)2486072
                            email: hello@dallasstudio.ru
                        </p>
                    </div>
                    <div className="col-m-4 col-t-2 col-1">
                        <ul>
                            <li><Link href="/"><a>Бальные танцы</a></Link></li>
                            <li><Link href="/"><a >Стрип пластика</a></Link></li>
                            <li><Link href="/"><a >Кавердэнс</a></Link></li>
                            <li><Link href="/"><a>Чирхоп</a></Link></li>
                        </ul>
                    </div>
                    <div className="col-m-4 col-t-2 col-1">
                        <ul>
                            <li><Link href="/"><a >Направления</a></Link></li>
                            <li><Link href="/"><a>Цены</a></Link></li>
                            <li><Link href="/"><a >Расписание</a></Link></li>
                            <li><Link href="/"><a>Контакты</a></Link></li>
                        </ul>
                    </div>
                    <div className="col-m-4 col-t-2 col-1 social">
                        <Link href='/'>
                            <a style={{backgroundImage: 'url(\'/images/icon-facebook.svg\')'}}></a>                    
                        </Link>
                        <Link href='/'>
                            <a style={{backgroundImage: 'url(\'/images/icon-insta.svg\')'}}></a>
                        </Link>
                        <Link href='/'>
                            <a style={{backgroundImage: 'url(\'/images/icon-twitter.svg\')'}}></a>
                        </Link>
                        <Link href='/'>
                            <a style={{backgroundImage: 'url(\'/images/icon-youtube.svg\')'}}></a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer