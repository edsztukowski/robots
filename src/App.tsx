import { FC } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Login } from './Pages/Login/Login'
import { Header } from './Components/Header/Header'
import { AdminDash } from './Pages/Admin/Admin'
import { useAuth } from './hooks/useAuth'
import { VoteDashboard } from './Pages/VoteDashboard/VoteDashboard'
import { Results } from './Pages/Results/Results'
import './index.css'

export const App: FC = () => {
  const { token, userType, setToken } = useAuth()

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {!token ? (
            <Login setToken={setToken} />
          ) : (
            <>
              <Header />
              <VoteDashboard />
            </>
          )}
        </Route>
        <Route exact path="/results">
          {!token ? (
            <Login setToken={setToken} />
          ) : (
            <>
              <Header />
              <Results />
            </>
          )}
        </Route>
        <Route exact path="/admin">
          {!token ? (
            <Login setToken={setToken} />
          ) : userType === 'admin' ? (
            <>
              <Header />
              <AdminDash />
            </>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
      </Switch>
    </Router>
  )
}
