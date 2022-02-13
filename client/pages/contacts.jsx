const Contacts = () => {
    return (
        <div className="contacts">
            <div className="row">
                <div className="col-1 col-m-4">
                    <div>
                        <h2>Контакты</h2>
                        <ul>
                            <li>
                                <a href="tel:+79522486072">тел. +7(952)2486072</a>
                            </li>
                            <li>г. Пушкин, ул. Глинки, д. 1</li>
                            <li>email: hello@dallasstudio.ru</li>
                        </ul>
                    </div>            
                </div>
                <div className="col-3 col-m-4">
                    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Af128b0e20ae2ab7ee63cfeb7848c07983e102c2bb92161b09ecdc7f88799eeeb&amp;source=constructor" width="100%" height="500" frameBorder="0"></iframe>
                    {/* <script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Af128b0e20ae2ab7ee63cfeb7848c07983e102c2bb92161b09ecdc7f88799eeeb&amp;width=100%25&amp;height=500&amp;lang=ru_RU&amp;scroll=true"></script> */}
                </div>
            </div>
        </div>
    )
}

export default Contacts