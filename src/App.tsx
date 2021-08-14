import { FC } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Login } from './Pages/Login/Login'
import { AdminDash } from './Pages/Admin/Admin'
import { useAuth } from './hooks/useAuth'
import './index.css'
import { VoteDashboard } from './Pages/VoteDashboard/VoteDashboard'
import { Results } from './Pages/Results/Results'

export const App: FC = () => {
  const { token, userType, setToken } = useAuth()

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {!token ? <Login setToken={setToken} /> : <VoteDashboard />}
        </Route>
        <Route exact path="/results">
          {!token ? <Login setToken={setToken} /> : <Results />}
        </Route>
        <Route exact path="/admin">
          {!token ? (
            <Login setToken={setToken} />
          ) : userType === 'admin' ? (
            <AdminDash />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
      </Switch>
    </Router>
  )
}
