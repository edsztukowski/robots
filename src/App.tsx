import { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Login } from './Pages/Login/Login'
import { useAuth } from './hooks/useAuth'
import './index.css'

export const App: FC = () => {
  const { token, setToken } = useAuth()

  return (
    <Router>
      <Switch>
        <Route path="/">
          {!token ? <Login setToken={setToken} /> : <div>Logged in!</div>}
        </Route>
      </Switch>
    </Router>
  )
}
