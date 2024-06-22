import { makeStyles } from '@mui/styles';


const toolbarHeight = 64; 


export default makeStyles(() => ({
  toolbar: {
    minHeight: toolbarHeight,
    marginTop: 40
  },
  title: {
    marginTop: '5%',
  },
  buttons:{
    display: 'flex',
    gap: '10px'
  },
  emptyButton: {
    minWidth: '150px',
    '@media (max-width: 599px)': {
      marginBottom: '5px',
    },
    '@media (min-width: 600px)': {
      marginRight: '20px', 
    },
  },
  checkoutButton: {
    minWidth: '150px',
  },
  link: {
    textDecoration: 'none',
  },
  cardDetails: {
    display: 'flex',
    marginTop: '10%',
    width: '100%',
    justifyContent: 'space-between',
  },
}));
