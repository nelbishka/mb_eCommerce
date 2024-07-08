import {makeStyles} from '@mui/styles'

const useStyles = makeStyles({
  appBar: {
    position: 'relative',
  },
  toolbar: {
    minHeight: 64, 
  },
  layout: {
    marginTop: '5%',
    width: 'auto',
    marginLeft: 16, 
    marginRight: 16,
    '@media (min-width: 600px)': {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: 24, 
    marginBottom: 24,
    padding: 16, 
    '@media (max-width: 600px)': {
      width: '100%',
      marginTop: 60,
    },
    '@media (min-width: 600px)': {
      marginTop: 48, 
      marginBottom: 48,
      padding: 24, 
    },
  },
  stepper: {
    padding: '24px 0 40px', 
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: 24, 
    marginLeft: 8, 
  },
  divider: {
    margin: '20px 0',
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default useStyles;
