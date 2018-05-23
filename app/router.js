import React from 'react'
import {Router, Route, IndexRedirect} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import Authentication from './containers/Authentication'
import history from './history'
import SignInPage from './containers/SignInPage'
import Page from './containers/Page'
import DashboardPage from './containers/DashboardPage'
import AccountsPage from './containers/AccountsPage'
import AddAccountPage from './containers/AddAccountPage'
import BudgetPage from './containers/BudgetPage'

export default ({store}) => {
  const enhancedHistory = syncHistoryWithStore(history, store)
  return (
    <Router history={enhancedHistory}>
      <Route path="/signin" component={SignInPage}/>
      <Route path="/" component={Page}>
        <Route component={Authentication}>
          <IndexRedirect to="dashboard"/>
          <Route path="dashboard" component={DashboardPage}/>
          <Route path="accounts" component={AccountsPage}/>
          <Route path="accounts/add" component={AddAccountPage}/>
          <Route path="budget" component={BudgetPage}/>
        </Route>
      </Route>
    </Router>
  )
}
