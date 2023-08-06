import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import RepoCard from "./components/repo-card";

import { SearchState } from "../../redux/types";
import { PAGE_SIZE } from "../../utils/search";

import empty from '../../assets/empty.png'

import './repos.css'

const Repositories = () => {
    const [isInitialLoad, setIsInitialLoad] = useState(true)

    const { repositories: { currentData: repositories }, isFetching, error } = useSelector((state: SearchState) => state)

    useEffect(() => {
        if (repositories && repositories.length >= PAGE_SIZE) setIsInitialLoad(false)
        else setIsInitialLoad(true)
    }, [repositories])

    return (
        <>
            {
                /* Loading state */
                isFetching && isInitialLoad &&
                <>
                    <div className="repos">
                        {Array(30).fill("").map((p, i) => (
                            <RepoCard isPlaceholder key={i} />))}
                    </div>
                </>
            }
            {
                /* Empty state */
                !isFetching && (!repositories || repositories.length === 0) &&
                <>
                    <div className="empty-state">
                        <img className="icon" src={empty} alt="An artwork that encourages the user to start typing a search keyword" />
                        <p>Nothing to show here. Start typing keywords to get results.</p>
                    </div>
                </>
            }
            {
                /* Render results */
                (!isFetching || (repositories && repositories?.length > 0)) &&
                <>
                    < div className="repos" >
                        {repositories?.map((repo) => (
                            <RepoCard repo={repo} key={repo.id} />
                        ))}
                    </div >
                </>
            }
            {
                /* Show error message if exist */
                error &&
                <p className="error-msg">{error}</p>
            }
        </>
    )
}

export default Repositories;