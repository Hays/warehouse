export default (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
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
  }
})
