import Router from 'next/router'

const Card = ({className, title, description, label, img, directionId}) => {
    return (
        <div className={"schedule " + className}>
            <div className="schedule-header">
                <span>{label}</span>
            </div>
            <div className='schedule-img' style={{backgroundImage: `url(${img})`, backgroundSize: 'cover'}}>
                {/* <Image alt='image' src={img} className='cover' layout='fill'/> */}
                {/* <img src={img}/> */}
            </div>
            <div className='schedule-details relative'>
                <h2>
                    {title}
                </h2>
                <p>
                    {description}
                </p>
                <div style={{paddingBottom: '200px'}}>
                    <button className='button absolute' style={{bottom: '20px'}}
                        onClick={()=>Router.push(`/price/${directionId}`)}
                    >Записаться</button>
                </div>
            </div>
        </div>
    )
}

export default Card