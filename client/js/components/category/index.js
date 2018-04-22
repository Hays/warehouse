import React, { Component } from 'react'
import { TableHead, TableCell, TableRow, TableBody, Paper, Table, withStyles } from 'material-ui'
import styles from './styles'
import { Button } from 'material-ui';

class CategoryView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount(props) {

  }

  handleAddEvent() {
    console.log('test by Hays !!!')
  }

  render() {
    return (
      <Paper className={this.props.classes.root}>
        <Table className={this.props.classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <div className={this.props.classes.header}>
                  <div>类别名称</div>
                  <Button variant='raised' color='primary' onClick={this.handleAddEvent.bind(this)}>
                      添加
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(name => (
              <TableRow key='categoryCell'>
                <TableCell>{name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(CategoryView)
