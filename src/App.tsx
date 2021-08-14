import { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Entry } from './Pages/Entry/Entry'
import './App.css'

export const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Entry />
        </Route>
      </Switch>
    </Router>
  )
}
