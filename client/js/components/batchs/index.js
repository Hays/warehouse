import React, { Component } from 'react'
import { TableHead, TableCell, TableRow, TableBody, Paper, Table, withStyles, Button } from 'material-ui'
import styles from './styles'
import { getBatches } from '../../network/warehouse'
import { history } from '../../app'

const headers = [
  '总量',
  '库存',
  '来源',
  '入库日期',
  '操作'
]

class ItemListView extends Component {
  constructor (props) {
    super(props)
    if (!props.location.state) {
      console.error('can not found item id.....')
    }
    this.state = {
      data: []
    }
  }

  componentDidMount (props) {
    this.reloadData()
  }

  reloadData () {
    getBatches(this.props.location.state.id).then(ret => {
      this.setState({
        data: ret.data
      })
    }).catch((err) => {
      console.error(`get batchs error:${err}`)
    })
  }

  render () {
    return (
      <Paper className={this.props.classes.root}>
        <Table className={this.props.classes.table}>
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
            {this.state.data.map(batch => (
              <TableRow key={batch.id}>
                <TableCell>{batch.count}</TableCell>
                <TableCell>{batch.stock}</TableCell>
                <TableCell>{batch.source}</TableCell>
                <TableCell>{batch.created}</TableCell>
                <TableCell>
                  <Button className={this.props.classes.button} variant='raised' color='primary' onClick={() => { console.log('test by Hays ... ') }}>
                    删除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(ItemListView)
