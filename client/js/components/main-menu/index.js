import React, { Component } from 'react'
import { Menu, MenuItem } from 'material-ui'
import { Link } from 'react-router-dom'

export const options = [
  ['Home', '/'],
  ['Bland', '/bland'],
  ['Category', '/category'],
  ['About', '/about']
]

export default (props) => (
  <Menu 
    id='main-menu' 
    anchorEl={props.anchorEl} 
    open={Boolean(props.anchorEl)}
    onClose={props.handleClose}
    PaperProps={{
      style: {
        maxHeight: 48*4.5,
        width: 200
      }
    }} >
    {options.map(opt => (
      <MenuItem key={opt[1]} selected={opt[0] === props.selected} onClick={()=>{props.onMenuClick(opt[0], opt[1])}}>
        {opt[0]}
      </MenuItem>
    ))}
  </Menu>
)