
# Project Title
GitHub Searcher

## Demo link:
[Github Searcher Demo](https://github-search-seven-chi.vercel.app/)

## Table of Content:

- [About The App](#about-the-app)
- [Technologies](#technologies)
- [Approach](#approach)
- [References](#references)

## About The App
[Name of project] is an app that ...

## Technologies

- React.js
- TypeScript
- Redux 
- Redux Persist
- React Router
- Vanilla CSS

## Approach
I tried to mimic what could be done in a real-life project in terms of the project's structure, styling and components' structure in this example project.

**Project Structure**
The core file structure is set below
- **Components**: For core components such as headers, footer & generic components such as badges and cards (design system)
- **Layouts**: For layout wrappers to structure the core of the page. In my case, it acts as both a wrapper and a parent that does the necessary logic for other building blocks to render them.
- **Pages**: Separate entities as 'modules' that contain the parent component of the entity, children components or building blocks and styling sheet for the entity
- **Redux**: Contains state management logic
- **Utils**: For any helpers functions and scripts
- **API**: For all services that use API communication

**State Management**
Using redux-persist as required, benefits our case to cache any previous search results making it faster & optimized with fewer server hits when re-fetching the same results. With the help of redux-persist and using it as middleware with thunk I choose dictionary as the data structure of the state for both of repositories and users data, where the key is the search keyword (query) and the value is the data that corresponds to this search query (items, total_count of the query..etc). By choosing key,value dictionary makes it more efficient to get previous search results with the complexity of  **O(1)**. 

**Infinite scroll**
I choose to implement infinite scroll with vanilla Javascript while for some people it could be easier to use and existing package, just to demonstrate that going for external dependency is not my initial go-to solution

**Routing**
Entity dropdown acts as a navigator to apply the routing concept to mimic a real-world application 

**HTML & CSS**
For listing results as cards, I choose grid over flexbox as it was straightforward forward matching the columns number requirement (2 columns on small screens, 3 for bigger ones) & also straightforward with balancing cards size (width & height).

For loading states, I used the skeleton loading state concept to demonstrate that visual stability is very important. Skeletons help reducing layout shifts resulting in better CLS (Cumulative Layout Shift) metrics thus affecting the overall performance score for the better.

## References
- [Redux Docs](https://redux.js.org/introduction/getting-started)
- [Using Redux-persist with redux-toolkit ](https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/)
- [React router tutorial](https://reactrouter.com/en/main/start/tutorial/)
