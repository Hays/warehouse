import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'

class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}> 
                <AppBar title="Warehouse" /> 
            </MuiThemeProvider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))