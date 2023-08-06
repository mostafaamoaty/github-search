import { ReactNode } from 'react'
import './card.css'

export interface CardProps {
    children: ReactNode
}

const Card: React.FC<CardProps> = ({ children }) => {
    return (
        <div className="card">
            {children}
        </div>
    )
}

export default Card
