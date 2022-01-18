import Banner from "./banner"
import Image from 'next/image'

const Footer = () => {
    const directions = ['Балет', 'Чирхоп', 'Кавер дэнс', 'Стрип пластика']
    const contacts = ['тел. +7(952)2486072', 'г. Пушкин, ул. Глинки, д. 1', 'email: hello@dallasstudio.ru']
    return (
        <div>
            <Banner/>
            <div className="footer" style={{color:'white'}}>
                <div className="container pt-3">
                    <div className="row">
                        <div className="col d-none d-lg-block">
                            <h4>Направления</h4>
                            <ul style={{listStyleType: 'none'}} className='p-0'>
                                {directions.map(d=><li key={d}>{d}</li>)}
                            </ul>
                        </div>
                        <div className="col">
                            <h4>Контакты</h4>
                            <ul style={{listStyleType: 'none'}} className='p-0'>
                                {contacts.map(d=><li key={d}>{d}</li>)}
                            </ul>
                        </div>
                        <div className="col d-none d-lg-block">
                            <h4>Расписание</h4>
                            <h4>Цены</h4>
                        </div>
                        <div className="col d-flex justify-content-end align-items-start">
                            <Image src="/imgs/instagram.png" priority={true} alt="me" width="50" height="50"/>
                            <div style={{width:'20px'}}></div>
                            <Image src="/imgs/vk.png" priority={true} alt="me" width="84" height="50"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer