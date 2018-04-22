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
            <MainMenu 
              anchorEl={this.state.target}
              selected={this.state.selected} 
              handleClose={() => {this.setState({target: null})}} 
              onMenuClick={this.handleMenuClick.bind(this)} />
          </AppBar>
          
          <Route exact path='/' component={Home} />
          <Route path="/about" component={About}/>
        </MuiThemeProvider>
                
        {/* <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
      <hr />
    </div> */}
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))