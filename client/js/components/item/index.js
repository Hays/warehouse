import React, { Component } from 'react'
import { TableHead, TableCell, TableRow, TableBody, Paper, Table, withStyles, Button } from 'material-ui'
import styles from './styles'
import { getItems } from '../../network/warehouse'

const headers = [
  '名称',
  '品牌',
  '类别',
  '数量',
  '更新日期'
]

class ItemListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount(props) {
    this.reloadData()
  }

  reloadData() {
    getItems().then(ret => {
      this.setState({
        data: ret.data
      })
    }).catch((err) => {
      console.error(`get items error:${err}`)
    })
  }

  render() {
    return (
      <Paper className={this.props.classes.root}>
        <Table className={this.props.classes.table}>
          <TableHead>
            <TableRow key='item-header'>
              {headers.map(text => {
                return (
                  <TableCell>
                    {text}
                  </TableCell>
                )
              })}
              <TableCell>
                <Button variant='raised' color='primary' onClick={() => {console.log('test by Hays !!!! ')}}>
                  添加
                </Button>
              </TableCell>
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
                <TableCell>操作</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(ItemListView)