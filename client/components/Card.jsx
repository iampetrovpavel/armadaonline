import Image from 'next/image'
// import balet from '../images/balet.png'

const Card = ({className, title, description, label, img}) => {
    return (
        <div className={"schedule " + className}>
            <div className="schedule-header">
                <span>{label}</span>
            </div>
            <div className='schedule-img' style={{backgroundImage: `url(${img})`, backgroundSize: 'cover'}}>
                {/* <Image alt='image' src={img} className='cover' layout='fill'/> */}
                {/* <img src={img}/> */}
            </div>
            <div className='schedule-details'>
                <h3>
                    {title}
                </h3>
                <p>
                    {description}
                </p>
            </div>


        </div>
    )
}

export default Card