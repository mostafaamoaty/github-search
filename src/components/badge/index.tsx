import './badge.css'

interface BadgeProps {
    text: string
    color?: string
}

const Badge = ({ text = "Java" }: BadgeProps) => {
    return (
        <div className="badge">
            <span>
                {text}
            </span>
        </div>
    )
}

export default Badge