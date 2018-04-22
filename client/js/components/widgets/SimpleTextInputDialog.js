import React, { Component } from 'react'
import { Dialog, DialogTitle, Input, Button, DialogContent, DialogActions } from 'material-ui'

export default class SimpleTextInputDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    }
  }
  handleConfirm() {
    this.props.onConfirm(this.state.text)
  }
  handleCancel() {
    this.props.onCancel(this.state.text)
  }
  render() {
    return (
      <Dialog 
        disableBackdropClick 
        disableEscapeKeyDown 
        aria-labelledby='confirmation-dialog-title'
        open={this.props.open}>
        <DialogTitle id='confirmation-dialog-title'>
          {this.props.title}
        </DialogTitle>
        <DialogContent>
          <Input inputProps={{
            'aria-label': 'Description',
          }}
          autoFocus={true}
          onChange={(e) => {this.setState({text: e.target.value})}}
          placeholder={this.props.placeholder} />
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