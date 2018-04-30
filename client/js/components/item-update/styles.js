export default (theme) => ({
  root: {
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    marginTop: theme.spacing.unit * 3
  },
  row: {
    margin: theme.spacing.unit,
    minWidth: 300
  },
  bottom: {
    margin: theme.spacing.unit,
    minWidth: 300,
    display: 'flex',
    'justify-content': 'flex-end',
    'align-items': 'center'
  },
  button: {
    margin: theme.spacing.unit
  }
})
