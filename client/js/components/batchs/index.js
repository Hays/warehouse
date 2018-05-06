import React, { Component } from 'react'
import {
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Table,
  withStyles,
  Button,
  TableFooter,
  Dialog,
  DialogTitle,
  DialogContent,
  Input,
  DialogActions,
  List,
  ListItem
} from 'material-ui'
import styles from './styles'
import { getBatches, addBatch, deleteBatch } from '../../network/warehouse'
// import { history } from '../../app'

const headers = [
  '总量',
  '库存',
  '来源',
  '入库日期',
  '操作'
]

class BatchDialog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      price: 0.0,
      count: 0,
      source: ''
    }
  }

  handleConfirm () {
    this.props.onConfirm(this.state.count, this.state.price, this.state.source)
  }
  handleCancel () {
    this.props.onCancel(this.state.count, this.state.price, this.state.source)
  }

  render () {
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby='confirmation-dialog-title'
        open={this.props.open}>
        <DialogTitle id='confirmation-dialog-title'>
          新增批次
        </DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <Input className={this.props.classes.input} inputProps={{'aria-label': 'Description'}}
                autoFocus
                onChange={(e) => { this.setState({price: e.target.value}) }}
                placeholder='进货价' />
            </ListItem>
            <ListItem>
              <Input className={this.props.classes.input} inputProps={{'aria-label': 'Description'}}
                onChange={(e) => { this.setState({count: e.target.value}) }}
                placeholder='数量' />
            </ListItem>
            <ListItem>
              <Input className={this.props.classes.input} inputProps={{'aria-label': 'Description'}}
                onChange={(e) => { this.setState({source: e.target.value}) }}
                placeholder='来源' />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel.bind(this)} color='primary'>
            Cancel
          </Button>
          <Button onClick={this.handleConfirm.bind(this)} color='primary'>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

let BatchInputDialog = withStyles(styles)(BatchDialog)

class ItemListView extends Component {
  constructor (props) {
    super(props)
    if (!props.location.state) {
      console.error('can not found item id.....')
    }
    this.state = {
      data: [],
      open: false
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

  handleAddBatch (count, price, source) {
    let itemId = this.props.location.state.id
    console.log(`add batch itemId: ${itemId} price: ${price}, count: ${count}, source: ${source}`)
    if (!price || !count) {
      console.warn('price and count can not be blank!')
      return
    }
    let s = source
    if (!s) {
      s = ''
    }
    addBatch(itemId, count, price, s).then((ret) => {
      this.setState({open: false})
      if (ret === 0) {
        this.reloadData()
      } else {
        console.error(`add batch with item ${itemId} failed, ret : ${ret}`)
      }
    }).catch((err) => {
      this.setState({open: false})
      console.error(`add batch with item ${itemId} error:${err}`)
    })
  }

  handleDeleteBatch (batchId) {
    deleteBatch(batchId).then((ret) => {
      this.setState({open: false})
      if (ret === 0) {
        this.reloadData()
      } else {
        console.error(`delete batch with item ${batchId} failed, ret : ${ret}`)
      }
    }).catch((err) => {
      this.setState({open: false})
      console.error(`delete batch with item ${batchId} error:${err}`)
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
                  <Button className={this.props.classes.button} variant='raised' color='primary' onClick={() => { this.handleDeleteBatch(batch.id) }}>
                    删除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow key='bottom'>
              <TableCell colSpan={5}>
                <div className={this.props.classes.bottom}>
                  <Button className={this.props.classes.button} variant='raised' color='primary' onClick={() => { this.setState({ open: true }) }}>
                      添加
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <BatchInputDialog open={this.state.open} onConfirm={this.handleAddBatch.bind(this)} onCancel={() => { this.setState({open: false}) }} />
      </Paper>
    )
  }
}

export default withStyles(styles)(ItemListView)
