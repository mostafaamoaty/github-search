import Card from "../../../../components/card";
import { User } from "../../../../redux/types";
import './user-card.css'

export interface UserCardProps {
    user?: User
    isPlaceholder?: boolean
}

const UserCard = ({ user, isPlaceholder = false }: UserCardProps) => {
    const { login, avatar_url, html_url } = user || {};
    return (
        <Card>
            {isPlaceholder}
            <>
                {isPlaceholder ? (
                    <>
                        <div className="skeleton circle"></div>
                        <div className="skeleton rect"></div>
                        <div className="skeleton rect"></div>
                    </>
                ) : (
                    <>
                        <img className="avatar" src={avatar_url} alt={login} />
                        <p className="username">{login}</p>
                        <a className="btn-primary" href={html_url} target="_blank" rel="noreferrer">Visit Profile</a>
                    </>
                )}
            </>
        </Card>

    )
}

export default UserCard