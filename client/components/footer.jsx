const Footer = () => {
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
                            <li><a href="/">Бальные танцы</a></li>
                            <li><a href="/">Стрип пластика</a></li>
                            <li><a href="/">Кавердэнс</a></li>
                            <li><a href="/">Чирхоп</a></li>
                        </ul>
                    </div>
                    <div className="col-m-4 col-t-2 col-1">
                        <ul>
                            <li><a href="/">Направления</a></li>
                            <li><a href="/">Цены</a></li>
                            <li><a href="/">Расписание</a></li>
                            <li><a href="/">Контакты</a></li>
                        </ul>
                    </div>
                    <div className="col-m-4 col-t-2 col-1 social">
                        <a href='' style={{backgroundImage: 'url(\'/images/icon-facebook.svg\')'}}></a>
                        <a href='' style={{backgroundImage: 'url(\'/images/icon-insta.svg\')'}}></a>
                        <a href='' style={{backgroundImage: 'url(\'/images/icon-twitter.svg\')'}}></a>
                        <a href='' style={{backgroundImage: 'url(\'/images/icon-youtube.svg\')'}}></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer