import './badge.css'

interface BadgeProps {
    text: string
    color?: string
}

const Badge: React.FC<BadgeProps> = ({ text }) => {
    return (
        <div className="badge">
            <span>
                {text}
            </span>
        </div>
    )
}

export default Badge