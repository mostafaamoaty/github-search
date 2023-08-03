import Badge from "../../../../components/badge";
import Card from "../../../../components/card";
import { Repository } from "../../../../redux/types";
import './repo-card.css'
import star from '../../../../assets/star.svg'
import fork from '../../../../assets/fork.svg'

export interface RepoCardProps {
    repo?: Repository
    isPlaceholder?: boolean
}

const RepoCard = ({ repo, isPlaceholder = false }: RepoCardProps) => {
    const { full_name, topics, description, owner, stargazers_count, forks_count, html_url } = repo || {};
    return (
        <Card>
            <>
                {isPlaceholder ? (
                    <>
                        <div className="skeleton rect"></div>
                        <div className="skeleton rect"></div>
                        <div className="skeleton rect"></div>
                    </>
                ) : (
                    <>
                        <div className="repo-header">
                            <img className="owner-avatar" src={owner?.avatar_url} alt="" />
                            <a href={html_url} target="_blank" aria-label="Open repo on Github">
                                <p className="name">{full_name}</p>
                            </a>
                        </div>
                        <p className="description">{description}</p>
                        <div className="tags">
                            {topics?.map((topic) => (
                                <Badge text={topic} key={topic} />
                            ))
                            }
                        </div>
                        <div className="statistics-container">
                            <div className="stat">
                                <img src={star} alt="Stargazers" />
                                <span>{stargazers_count}</span>
                            </div>
                            <div className="stat">
                                <img src={fork} alt="Code Forks" />
                                <span>{forks_count}</span>
                            </div>
                        </div>
                        {/* <a className="btn-primary" href={link} target="_blank" rel="noreferrer">Visit Profile</a> */}
                    </>
                )}
            </>
        </Card>

    )
}

export default RepoCard