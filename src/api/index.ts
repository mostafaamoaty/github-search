const BASE_URL = "https://api.github.com";
const USERS_API = "/search/users"
const REPOS_API = "/search/repositories"

export const fetchUsers = async (search: string, page: number) => {
    return fetch(`${BASE_URL}${USERS_API}?q=${search}&page=${page}`).then(res => res.json())
}

export const fetchRepositories = async (search: string, page: number) => {
    return fetch(`${BASE_URL}${REPOS_API}?q=${search}&page=${page}`).then(res => res.json())
}