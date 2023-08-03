import { useSelector } from "react-redux";
import { SearchState } from "../../redux/types";
import RepoCard from "./components/repo-card";
import './repos.css'
import empty from '../../assets/empty.png'

const Repositories = () => {
    const { repositories: { currentData: repositories }, isFetching, error } = useSelector((state: SearchState) => state)

    return (
        <>
            {
                /* Loading state */
                isFetching &&
                <>
                    <div className="repos">
                        {Array(30).fill("").map((p, i) => (
                            <RepoCard isPlaceholder key={i} />))}
                    </div>
                </>
            }
            {
                /* Empty state */
                !isFetching && !repositories &&
                <>
                    <div className="empty-state">
                        <img className="icon" src={empty} alt="An artwork that encourages the user to start typing a search keyword" />
                        <p>Nothing to show here. Start typing keywords to get results.</p>
                    </div>
                </>
            }
            {
                /* Render results */
                !isFetching &&
                <>
                    < div className="repos" >
                        {repositories?.map((repo) => (
                            <RepoCard repo={repo} key={repo.full_name} />
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