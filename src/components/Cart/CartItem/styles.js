import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  media: {
    height: 350,
    width : '100%',
    margin : 'auto'
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardActions: {
    justifyContent: 'space-around',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
}));