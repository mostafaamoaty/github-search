import { useSelector } from "react-redux";
import { SearchState } from "../../redux/types";
import UserCard from "./components/user-card";
import './users.css'
import empty from '../../assets/empty.png'

const Users = () => {
    const { users: { currentData: users }, isFetching, error } = useSelector((state: SearchState) => state)
    console.log(isFetching);


    return (
        <>
            {
                /* Show error message if exist */
                error &&
                <p className="error-msg">{error}</p>
            }
            {
                /* Loading state */
                isFetching &&
                <>
                    <div className="users">
                        {Array(30).fill("").map((p, i) => (
                            <UserCard isPlaceholder key={i} />))}
                    </div>
                </>
            }
            {
                /* Empty state */
                !isFetching && (!users || users.length === 0) &&
                <>
                    <div className="empty-state">
                        <img className="icon" src={empty} alt="An artwork that encourages the user to start typing a search keyword" />
                        {
                            /* Initial empty state */
                            !users &&
                            <p>Nothing to show here. Start typing keywords to get results.</p>
                        }
                        {
                            /* Empty results state */
                            users?.length === 0 &&
                            <p>No results found. Try searching for other keywords.</p>
                        }
                    </div>
                </>
            }
            {
                /* Render results */
                !isFetching && users && users?.length > 0 &&
                <>
                    <div className="users">
                        {users?.map((user) => (
                            <UserCard user={user} key={user.avatar_url} />
                        ))}
                    </div>
                </>
            }
        </>
    )
}

export default Users;