import React from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import './App.css'

const GET_USERS = gql`
  {
    users {
      id
      login
      avatar_url
    }
  }
`

const GET_USERS_WITH_FOLLOWERS = gql`
  {
    usersWithFollowers {
      id
      login
      avatar_url
      followers_url
    }
  }
`

const GET_USERS_WITH_REPOS = gql`
  {
    usersWithRepos {
      id
      login
      avatar_url
      repos_url
    }
  }
`

const User = ({ user }) => (
  <div className="Card">
    <div>
      <img alt="avatar" className="Card--avatar" src={user.avatar_url} />
      <h1 className="Card--name">{user.login}</h1>
    </div>
    <a href={`https://github.com/${user.login}`} className="Card--link">
      See profile
    </a>
    { user.repos_url && <a href={user.repos_url}>Repositories</a>}
    { user.followers_url && <a href={user.repos_url}>Followers</a>}
  </div>
)

function App() {
  // const { loading, error, data } = useQuery(GET_USERS)
  // const { loading, error, data } = useQuery(GET_USERS_WITH_REPOS)
  const { loading, error, data } = useQuery(GET_USERS_WITH_FOLLOWERS)

  if (error) return <h1>Something went wrong!</h1>
  if (loading) return <h1>Loading...</h1>

  return (
    <main className="App">
      <h1>Github | Users</h1>
      {data.usersWithFollowers.map(user => (
        <User key={user.id} user={user} />
      ))}
    </main>
  )
}

export default App;
