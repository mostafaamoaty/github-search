import { fetchRepositories, fetchUsers } from "../api"
import { addRepoHistory, addUserHistory, setError, setFetchingStatus, setReposData, setUserData } from "../redux/store"
import { Repository, SearchState, User } from "../redux/types"

export const saveUserHistory = (dispatch: Function, query: string, users: User[], history: SearchState, currentPage: { users: number }, totalCount: number) => {
    const savedUsers = [...(history.users.history[query]?.data || [])]

    dispatch(setUserData([...savedUsers, ...users]))
    dispatch(addUserHistory({
        key: query,
        data: [...savedUsers, ...users],
        pages: currentPage.users,
        totalCount
    }))
}

export const saveRepoHistory = (dispatch: Function, query: string, repos: Repository[], history: SearchState, currentPage: { repos: number }, totalCount: number) => {
    const savedRepos = [...(history.repositories.history[query]?.data || [])]

    dispatch(setReposData([...savedRepos, ...repos]))
    dispatch(addRepoHistory({
        key: query,
        data: [...savedRepos, ...repos],
        pages: currentPage.repos,
        totalCount
    }))
}

export const getUsers = async (dispatch: Function, query: string | undefined, currentPage: { users: number }, setCurrentPage: Function, history: SearchState) => {
    const limit = history.users.history[query || '']?.totalCount
    const usersLength = history.users.history[query || '']?.data.length
    const reachedLimit = limit && usersLength && usersLength === limit

    dispatch(setError(''))

    if (!query || reachedLimit) {
        dispatch(setFetchingStatus(false))
        return;
    }

    dispatch(setFetchingStatus(true))

    try {

        const res = await fetchUsers(query, currentPage.users);
        const totalCount = res.total_count || 0

        setCurrentPage({ ...currentPage, users: currentPage.users + 1 })
        const users: User[] = res.items

        saveUserHistory(dispatch, query.trim().toLowerCase(), users, history, currentPage, totalCount)

        dispatch(setFetchingStatus(false))
    } catch (e) {
        setCurrentPage({ ...currentPage, users: currentPage.users })
        dispatch(setFetchingStatus(false))
        dispatch(setError('Something went wrong.'))
    }
}

export const getRepos = async (dispatch: Function, query: string | undefined, currentPage: { repos: number }, setCurrentPage: Function, history: SearchState) => {
    const limit = history.repositories.history[query || '']?.totalCount
    const reposLength = history.repositories.history[query || '']?.data.length
    const reachedLimit = limit && reposLength && reposLength === limit

    dispatch(setError(''))

    if (!query || reachedLimit) {
        dispatch(setFetchingStatus(false))
        return;
    }

    dispatch(setFetchingStatus(true))

    try {

        const res = await fetchRepositories(query, currentPage.repos);
        const totalCount = res.total_count || 0
        setCurrentPage({ ...currentPage, repos: currentPage.repos + 1 })
        const repos: Repository[] = res.items

        saveRepoHistory(dispatch, query.trim().toLowerCase(), repos, history, currentPage, totalCount)

        dispatch(setFetchingStatus(false))
    } catch (e) {
        /* Reset current page in case of failed request to retry the same failed one */
        setCurrentPage({ ...currentPage, repos: currentPage.repos })

        dispatch(setFetchingStatus(false))
        dispatch(setError('Something went wrong.'))
    }
}