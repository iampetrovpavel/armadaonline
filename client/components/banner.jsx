const Banner = () => {
    return (
        <div className="banner">
            <div className="container fs-5 fw-bold d-flex flex-column flex-lg-row justify-content-between">
                <div className="my-3 d-flex align-items-center justify-content-start">
                    <span>ЗАПИШИСЬ НА ПРОБНОЕ ЗАНЯТИЕ</span>
                </div>
                <div>
                    <input className="banner-input my-3" placeholder="Имя"/>
                    <div className="d-none d-lg-inline-block" style={{width: '20px'}}></div>
                    <input className="banner-input my-3" placeholder="Телефон"/>          
                </div>
                <div>
                    <button className="banner-btn px-3 my-3 fw-bold">Записаться</button>
                </div>
            </div>
        </div>
    )
}

export default Banner