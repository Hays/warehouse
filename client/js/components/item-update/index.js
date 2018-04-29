import React, { Component } from 'react'
import { withStyles, Button, FormControl, InputLabel, Input } from 'material-ui'
import styles from './styles'
import { history } from '../../app'

class ItemUpdateView extends Component {
  constructor(props) {
    super(props)
    // 这里可以通过history push(${path}, ${state})传递参数过来
    if (props.location.state) {
      // TODO: 存在时则为修改信息
    }
    this.state = {
      brand: '',
      category: '',
    }
  }

  handleOK() {

  }

  handleCancel() {

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
          <Input id='brand-select' value={this.state.brand} />
        </FormControl>
        <FormControl className={this.props.classes.row}>
          <InputLabel htmlFor='cat-select'>Category</InputLabel>
          <Input id='cat-select' value={this.state.category} />
        </FormControl>
        <FormControl className={this.props.classes.row}>
          <InputLabel htmlFor='desc-input'>Description</InputLabel>
          <Input id='desc-input' />
        </FormControl>
        <div className={this.props.classes.bottom}>
          <Button className={this.props.classes.button} variant='raised' color='primary' onClick={this.handleCancel.bind(this)}>Cancel</Button>
          <Button className={this.props.classes.button} variant='raised' color='primary' onClick={this.handleOK.bind(this)}>OK</Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(ItemUpdateView)