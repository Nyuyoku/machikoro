'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
// import Login from './components/Login'
// import {WhoAmI} from './components/WhoAmI'
import {settingGame, fetchGame, addUserToGame, findOwner} from './reducers/game'
import {connectToGame, createRef} from './reducers/firebase';
import axios from 'axios';

import GamePage from './components/GamePage'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Signup from './components/Signup'
import WaitingForGame from './components/WaitingForGame'
import AppContainer from './containers/AppContainer'

const firebaseRef = store.getState().firebaseRef;

const setGame = () => {
  firebaseRef.on('value', snap => {
    store.dispatch(settingGame(snap.val()))
  })
}

const onEnterAddUser = (nextState) => {
  let routeGameLink = nextState.params.gameLink
  store.dispatch(addUserToGame(routeGameLink))
  store.dispatch(findOwner(routeGameLink))
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={HomePage} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/lobby" component={HomePage} />
        <Route path="/game/:gameLink" component={GamePage} onEnter={(route) => createRef(route.params.gameLink)} />
        <Route path="/lobby/:gameLink" component={WaitingForGame} onEnter={onEnterAddUser}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
