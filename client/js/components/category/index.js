import React, { Component } from 'react'
import { TableHead, TableCell, TableRow, TableBody, Paper, Table, withStyles, Button, TableFooter } from 'material-ui'
import styles from './styles'
import SimpleTextInputDialog from '../widgets/SimpleTextInputDialog'
import { getCategorys, addCategory, deleteCategory } from '../../network/warehouse'

class CategoryView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      open: false
    }
  }
  componentDidMount (props) {
    this.reloadData()
  }

  handleAddCategory (name) {
    console.log(`add category ${name}`)
    if (!name) {
      console.warn('name can not be blank!')
      return
    }
    addCategory(name).then((ret) => {
      this.setState({open: false})
      if (ret === 0) {
        this.reloadData()
      } else {
        console.error(`add category with name ${name} failed, ret : ${ret}`)
      }
    }).catch((err) => {
      this.setState({open: false})
      console.error(`add category with name ${name} error:${err}`)
    })
  }

  reloadData () {
    getCategorys().then(ret => {
      this.setState({
        data: ret.data
      })
    }).catch((err) => {
      console.error(`get categorys error:${err}`)
    })
  }

  handleDeleteCategory (catId) {
    deleteCategory(catId).then((ret) => {
      this.setState({open: false})
      if (ret === 0) {
        this.reloadData()
      } else {
        console.error(`delete category ${catId} failed, ret : ${ret}`)
      }
    }).catch((err) => {
      this.setState({open: false})
      console.error(`delete category ${catId} error:${err}`)
    })
  }

  render () {
    return (
      <Paper className={this.props.classes.root}>
        <Table className={this.props.classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                类别名称
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(cat => (
              <TableRow key={cat.id}>
                <TableCell>{cat.name}</TableCell>
                <TableCell>
                  <Button className={this.props.classes.button} variant='raised' color='primary' onClick={() => { this.handleDeleteCategory(cat.id) }}>
                    删除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>
                <div className={this.props.classes.bottom}>
                  <Button variant='raised' color='primary' onClick={() => { this.setState({open: true}) }}>
                      添加
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <SimpleTextInputDialog title='添加类别' open={this.state.open} onConfirm={this.handleAddCategory.bind(this)} onCancel={() => { this.setState({open: false}) }} placeholder='Name' />
      </Paper>
    )
  }
}

export default withStyles(styles)(CategoryView)
