import React, { Component } from 'react'
import { withStyles, Button, FormControl, InputLabel, Input, Menu, MenuItem } from 'material-ui'
import styles from './styles'
import { history } from '../../app'
import { getCategorys, getBrands } from '../../network/warehouse'

class ItemUpdateView extends Component {
  constructor(props) {
    super(props)
    // 这里可以通过history push(${path}, ${state})传递参数过来 
    if (props.location.state) {
      // TODO: 存在时则为修改信息
    }
    this.state = {
      brand: {
        name: ''
      },
      category: {
        name: ''
      },
      focusInput: null,
      categorys: [],
      brands: [],
      isCat: false,
      options: [],
      isClosing: false,
    }
  }

  componentDidMount(props) {
    this.loadCategorys()
    this.loadBrands()
  }

  handleOK() {

  }

  handleCancel() {
    history.push('/items')
  }

  handleSelectEvent(option) {
    if (this.state.isCat) {
      this.setState({
        category: option,
        focusInput: null,
        isClosing: true
      })
    } else {
      this.setState({
        brand: option,
        focusInput: null, 
        isClosing: true
      })
    }
  }

  loadCategorys() {
    getCategorys().then(ret => {
      this.setState({
        categorys: ret.data
      })
    }).catch((err) => {
      console.error(`get categorys error:${err}`)
    })
  }

  loadBrands() {
    getBrands().then(ret => {
      this.setState({
        brands: ret.data
      })
    }).catch((err) => {
      console.error(`get brands error:${err}`)
    })
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <FormControl className={this.props.classes.row}>
          <InputLabel htmlFor='name-input'>Name</InputLabel>
          <Input id='name-input' />
        </FormControl>
        <FormControl className={this.props.classes.row}>
          <InputLabel htmlFor='brand-select'>Brand</InputLabel>
          <Input id='brand-select' value={this.state.brand.name} onClick={(e) => {
            this.setState({focusInput: e.target, isCat: false, options: this.state.brands})
          }} />
        </FormControl>
        <FormControl className={this.props.classes.row}>
          <InputLabel htmlFor='cat-select'>Category</InputLabel>
          <Input id='cat-select' value={this.state.category.name} onClick={(e) => {
            this.setState({focusInput: e.target, isCat: true, options: this.state.categorys})
          }} />
        </FormControl>
        <FormControl className={this.props.classes.row}>
          <InputLabel htmlFor='desc-input'>Description</InputLabel>
          <Input id='desc-input' />
        </FormControl>
        <div className={this.props.classes.bottom}>
          <Button className={this.props.classes.button} variant='raised' color='primary' onClick={this.handleCancel.bind(this)}>Cancel</Button>
          <Button className={this.props.classes.button} variant='raised' color='primary' onClick={this.handleOK.bind(this)}>OK</Button>
        </div>

        <Menu 
          id='item-menu' 
          anchorEl={this.state.focusInput} 
          open={Boolean(this.state.focusInput)}
          onClose={() => {
            this.setState({focusInput: null})
          }}
          PaperProps={{
            style: {
              maxHeight: 48*4.5,
              width: 200
            }
          }} >
          {this.state.options.map(opt => (
            <MenuItem key={opt.id} onClick={this.handleSelectEvent.bind(this, opt)}>
              {opt.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}

export default withStyles(styles)(ItemUpdateView)