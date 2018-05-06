import React, { Component } from 'react'
import { TableHead, TableCell, TableRow, TableBody, Paper, Table, withStyles, Button, TableFooter } from 'material-ui'
import styles from './styles'
import SimpleTextInputDialog from '../widgets/SimpleTextInputDialog'
import { getBrands, addBrand, deleteBrand } from '../../network/warehouse'

class BrandView extends Component {
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

  handleAddBrand (name) {
    console.log(`add brand ${name}`)
    if (!name) {
      console.warn('name can not be blank!')
      return
    }
    addBrand(name).then((ret) => {
      this.setState({open: false})
      if (ret === 0) {
        this.reloadData()
      } else {
        console.error(`add brand with name ${name} failed, ret : ${ret}`)
      }
    }).catch((err) => {
      this.setState({open: false})
      console.error(`add brand with name ${name} error:${err}`)
    })
  }

  reloadData () {
    getBrands().then(ret => {
      this.setState({
        data: ret.data
      })
    }).catch((err) => {
      console.error(`get brands error:${err}`)
    })
  }

  handleDeleteBrand (brandId) {
    deleteBrand(brandId).then((ret) => {
      this.setState({open: false})
      if (ret === 0) {
        this.reloadData()
      } else {
        console.error(`delete brand ${brandId} failed, ret : ${ret}`)
      }
    }).catch((err) => {
      this.setState({open: false})
      console.error(`delete brand ${brandId} error:${err}`)
    })
  }

  render () {
    return (
      <Paper className={this.props.classes.root}>
        <Table className={this.props.classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                品牌名称
              </TableCell>
              <TableCell>
                操作
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(brand => (
              <TableRow key={brand.id}>
                <TableCell>{brand.name}</TableCell>
                <TableCell>
                  <Button className={this.props.classes.button} variant='raised' color='primary' onClick={() => { this.handleDeleteBrand(brand.id) }}>
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
        <SimpleTextInputDialog title='添加品牌' open={this.state.open} onConfirm={this.handleAddBrand.bind(this)} onCancel={() => { this.setState({open: false}) }} placeholder='Name' />
      </Paper>
    )
  }
}

export default withStyles(styles)(BrandView)
