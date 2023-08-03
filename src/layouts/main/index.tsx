import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SearchState } from "../../redux/types"
import { setFetchingStatus, setReposData, setUserData } from "../../redux/store"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { debounce } from "lodash"
import './layout.css'
import Header from "../../components/header"
import { debounceRepoFn, debounceUserFn } from "../../utils/history"
import { SearchType } from "../../redux/enums"

const MainLayout = () => {
    const DEBOUNCE_OFFEST = 1500 // milliseconds
    const SEARCH_MIN_CHARS = 3

    const dispatch = useDispatch()

    const [query, setQuery] = useState("")
    const [type, setType] = useState("user")
    const [page, setPage] = useState({ users: 1, repos: 1 })

    const searchRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const history = useSelector((state: SearchState) => state)

    const navigate = useNavigate();
    const location = useLocation()


    const debounceUserSearch = useCallback(debounce(debounceUserFn, DEBOUNCE_OFFEST), [])
    const debounceRepoSearch = useCallback(debounce(debounceRepoFn, DEBOUNCE_OFFEST), [])

    /* Route change listener for entity type */
    useEffect(() => {
        if (location.pathname.startsWith('/repos')) setType(SearchType.Repos)
        else setType(SearchType.Users)

    }, [location])

    useEffect(() => {
        if (searchRef.current)
            setQuery(searchRef.current.value)
        return () => {
            setQuery("")
        } /* Clear search value on destroy */
    }, [searchRef.current])


    /* Search query changes */
    useEffect(() => {
        setPage({
            users: 1,
            repos: 1
        })

        const key = query.trim().toLowerCase()

        /* Start fetching data only when the search query length is greater than the minimum characters offset */
        if (query.length < SEARCH_MIN_CHARS) {
            dispatch(setUserData(undefined))
            dispatch(setReposData(undefined))
            return;
        };

        /* Search in entities based on selected type */
        if (type === SearchType.Users) searchUsers(key)
        else searchRepos(key)

    }, [query])

    const options = {
        root: null,
        threshold: 1.0,
        rootMargin: '0px',
    }

    /* Infinite scroll */
    useEffect(() => {
        const handleScroll = (e: any) => {
            if (history.isFetching) return;
            const offset = 200
            const currentPosition = window.scrollY + window.innerHeight
            const bodyHeight = document.body.clientHeight
            const reachedBottom = bodyHeight - currentPosition < offset
            if (!reachedBottom) return;

            if (type === SearchType.Users) debounceUserSearch(dispatch, query, page, setPage, history)
            else debounceRepoSearch(dispatch, query, page, setPage, history)

        }

        if (containerRef.current) {
            document.addEventListener("scroll", handleScroll)
        }

        return () => {
            if (containerRef.current) document.removeEventListener("scroll", handleScroll)
        }
    }, [containerRef.current, options])


    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => { setQuery(e.target.value) }
    const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const currentType = e.target.value
        setType(currentType)
        navigate(`/${currentType}`)
        const key = query.trim().toLowerCase()

        if (currentType === SearchType.Users) searchUsers(key)
        else searchRepos(key)
    }

    const searchUsers = (key: string) => {
        dispatch(setFetchingStatus(true))

        const userHistory = Object.keys(history.users.history);

        /* Fetch data from API if it's not previously persisted */
        if (!userHistory.includes(key)) {
            dispatch(setUserData(undefined))
            debounceUserSearch(dispatch, query, page, setPage, history)
            return;
        }

        /* ????????? */
        debounceUserSearch(dispatch, undefined, page, setPage, history)
        dispatch(setUserData(history.users.history[key].data))
        dispatch(setFetchingStatus(false))

        setPage({
            ...page,
            users: (history.users.history[key]?.pages || 0) + 1,
        })
    }

    const searchRepos = (key: string) => {
        dispatch(setFetchingStatus(true))
        const reposHistory = Object.keys(history.repositories.history);

        if (!reposHistory.includes(key)) {
            dispatch(setReposData(undefined))
            debounceRepoSearch(dispatch, query, page, setPage, history)
            return;
        }

        /* ????????? */
        debounceRepoSearch(dispatch, undefined, page, setPage, history)
        dispatch(setReposData(history.repositories.history[key].data))
        dispatch(setFetchingStatus(false))

        setPage({
            ...page,
            repos: (history.repositories.history[key]?.pages || 0) + 1,
        })
    }

    return (
        <div className="main-layout">
            <Header />
            <div className="search-container">
                <input className="search" id="search" name="search" aria-label="Search on Github for users/repositories" type="text" placeholder="Start typing to search..." value={query} onChange={handleSearchChange} ref={searchRef} autoFocus />
                <select className="type" name="type" id="type" value={type} onChange={handleTypeChange}>
                    <option value="users">Users</option>
                    <option value="repos">Repositories</option>
                </select>
            </div>
            <div ref={containerRef}>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout