import React, { Component } from 'react'
import { TableHead, TableCell, TableRow, TableBody, Paper, Table, withStyles, Button, TableFooter } from 'material-ui'
import styles from './styles'
import { getItems, deleteItem } from '../../network/warehouse'
import { history } from '../../app'

const headers = [
  '名称',
  '品牌',
  '类别',
  '数量',
  '更新日期',
  '操作'
]

class ItemListView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount (props) {
    this.reloadData()
  }

  reloadData () {
    getItems().then(ret => {
      this.setState({
        data: ret.data
      })
    }).catch((err) => {
      console.error(`get items error:${err}`)
    })
  }

  handleDeleteItem (itemId) {
    deleteItem(itemId).then((ret) => {
      this.setState({open: false})
      if (ret === 0) {
        this.reloadData()
      } else {
        console.error(`delete item ${itemId} failed, ret : ${ret}`)
      }
    }).catch((err) => {
      this.setState({open: false})
      console.error(`delete item ${itemId} error:${err}`)
    })
  }

  render () {
    return (
      <Paper className={this.props.classes.root}>
        <Table>
          <TableHead>
            <TableRow key='item-header'>
              {headers.map(text => {
                return (
                  <TableCell key={text}>
                    {text}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.brand.name}</TableCell>
                <TableCell>{item.category.name}</TableCell>
                <TableCell>{item.count}</TableCell>
                <TableCell>{item.updated}</TableCell>
                <TableCell>
                  <Button
                    className={this.props.classes.button}
                    variant='raised'
                    color='primary'
                    onClick={() => { history.push('/batchs', item) }}>
                    查看
                  </Button>
                  <Button
                    className={this.props.classes.button}
                    variant='raised'
                    color='primary'
                    onClick={() => { this.handleDeleteItem(item.id) }}>
                    删除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>
                <div className={this.props.classes.bottom}>
                  <Button variant='raised' color='primary' onClick={() => { history.push('/item-add') }}>
                    添加
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(ItemListView)
