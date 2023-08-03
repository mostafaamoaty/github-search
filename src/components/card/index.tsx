import { ReactNode } from 'react'
import './card.css'

export interface CardProps {
    children: ReactNode
}

const Card = ({ children }: CardProps) => {
    return (
        <div className="card">
            {children}
        </div>
    )
}

export default Card
