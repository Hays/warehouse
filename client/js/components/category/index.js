import React, { Component } from 'react'
import { TableHead, TableCell, TableRow, TableBody, Paper, Table, withStyles, Button } from 'material-ui'
import styles from './styles'
import SimpleTextInputDialog from '../widgets/SimpleTextInputDialog'

class CategoryView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      open: false
    }
  }
  componentDidMount(props) {

  }

  handleAddCategory(name) {
    console.log(`add category ${name}`)
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
                  <Button variant='raised' color='primary' onClick={this.setState({open: true})}>
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
        <SimpleTextInputDialog title='添加类别' open={this.state.open} onConfirm={this.handleAddCategory.bind(this)} onCancel={()=>{this.setState({open: false})}} placeholder='Name' />
      </Paper>
    )
  }
}

export default withStyles(styles)(CategoryView)
