export interface User {
    id: number
    login: string
    avatar_url: string
    html_url: string
    score: number
}

export interface Repository {
    id: number
    full_name: string
    description: string
    language: string
    topics?: string[]
    stargazers_count: number
    owner: User
    html_url: string
    forks_count: number
}

export interface AddHistoryProps {
    key: string
    data: User[] | Repository[]
    pages: number
    totalCount: number
}

export interface SearchState {
    users: {
        currentData?: User[],
        history: {
            [key: string]: {
                data: User[],
                pages: number,
                totalCount: number
            }
        }
    }
    repositories: {
        currentData?: Repository[],
        history: {
            [key: string]: {
                data: Repository[],
                pages: number,
                totalCount: number
            }
        }
    }
    isFetching: boolean
    error: string
}
