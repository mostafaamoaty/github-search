import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import UserCard from "./components/user-card";

import { SearchState } from "../../redux/types";
import { PAGE_SIZE } from "../../utils/search";

import empty from '../../assets/empty.png'

import './users.css'

const Users = () => {
    const [isInitialLoad, setIsInitialLoad] = useState(true)

    const { users: { currentData: users }, isFetching, error } = useSelector((state: SearchState) => state)

    useEffect(() => {
        if (users && users.length >= PAGE_SIZE) setIsInitialLoad(false)
        else setIsInitialLoad(true)
    }, [users])

    return (
        <>
            {
                /* Show error message if exist */
                error &&
                <p className="error-msg">{error}</p>
            }
            {
                /* Loading state (skeleton) */
                isFetching && isInitialLoad &&
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
                (!isFetching || (users && users?.length > 0)) &&
                <>
                    <div className="users">
                        {users?.map((user, index) => (
                            <UserCard user={user} key={`${index} - ${user.id}`} />
                        ))}
                    </div>
                </>
            }
        </>
    )
}

export default Users;