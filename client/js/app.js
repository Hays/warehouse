import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { Route, Link } from 'react-router-dom'
import { AppBar, Toolbar, createMuiTheme, IconButton, Typography } from 'material-ui'
import { MuiThemeProvider } from 'material-ui/styles'
import MainMenu, { options } from './components/main-menu'
import MenuIcon from '@material-ui/icons/Menu'
import { createBrowserHistory } from 'history'
import Home from './components/home'
import Category from './components/category' 
  
const About = () => (
  <div>
    <h2>About</h2>
  </div>
)
  
const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)
  
const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
            Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
            Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
            Props v. State
        </Link>
      </li>
    </ul>
    <div>
      <h2>Home</h2>
    </div>
    <Route path={`${match.path}/:topicId`} component={Topic}/>
    <Route exact path={match.path} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const history = createBrowserHistory()
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      target: null,
      selected: options[0],
    }
  }

  handleMenuClick(name, url) {
    console.log(`select page ${name}`)
    this.setState({
      selected: name,
      target: null
    })
    history.push(url)
  }

  render() {
    return (
      <Router history={history}>
        <MuiThemeProvider theme={createMuiTheme()}>
          <AppBar title="Warehouse" position="static">
            <Toolbar>
              <IconButton color='inherit' aria-label='Menu' onClick={(e) => {this.setState({target: e.currentTarget})}}>
                <MenuIcon />
              </IconButton>
              <Typography variant='title' color='inherit'>
                Warehouse
              </Typography>
            </Toolbar>
            {/* TODO: 这里后面可以更换为drawer */}
            <MainMenu 
              anchorEl={this.state.target}
              selected={this.state.selected} 
              handleClose={() => {this.setState({target: null})}} 
              onMenuClick={this.handleMenuClick.bind(this)} />
          </AppBar>
          
          <Route exact path={options[0][1]} component={Home} />
          <Route path={options[2][1]} component={Category}/>
          <Route path={options[3][1]} component={About}/>
        </MuiThemeProvider>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))