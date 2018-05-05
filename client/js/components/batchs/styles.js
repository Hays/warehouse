export default (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 300
  },
  header: {
    display: 'flex',
    'justify-content': 'space-between',
    height: '100%',
    'align-items': 'center'
  },
  button: {
    margin: theme.spacing.unit
  },
  bottom: {
    display: 'flex',
    'justify-content': 'flex-end',
    height: '100%'
  },
  input: {
    margin: theme.spacing.unit
  }
})
