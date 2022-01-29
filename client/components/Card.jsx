import Image from 'next/Image'
import balet from '../images/balet.png'

const Card = ({className}) => {
    return (
        <div className={"card " + className}>
            <div className="card-header">
                <span>19 дек 2022</span>
            </div>
            <div className='card-img'>
                <Image src={balet} className='cover' layout='fill'/>
            </div>
            <div className='card-details'>
                <h3>
                    Бальные танцы
                </h3>
                <p>
                    Это красота, грация и изящество, это эмоции, которые никого не оставят равнодушными!
                </p>
            </div>


        </div>
    )
}

export default Card