import { makeStyles } from '@mui/styles';

const drawerWidth = 0;
const borderRadius = 4;
const spacing = 8; 

const fade = (color, opacity) => {
  const hexOpacity = Math.round(opacity * 255).toString(16).padStart(2, '0');
  return `${color}${hexOpacity}`;
};

export default makeStyles(() => ({
  appBar: {
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    '@media (min-width: 600px)': {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  title: {
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
    textDecoration: 'none',
  },
  image: {
    marginRight: '10px',
  },
  menuButton: {
    marginRight: spacing * 2,
    '@media (min-width: 600px)': {
      display: 'none',
    },
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: borderRadius,
    backgroundColor: fade('#ffffff', 0.15),
    '&:hover': {
      backgroundColor: fade('#ffffff', 0.25),
    },
    marginRight: spacing * 2,
    marginLeft: 0,
    width: '100%',
    '@media (min-width: 600px)': {
      width: 'auto',
    },
  },
  searchIcon: {
    padding: `${spacing}px ${spacing * 2}px`,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: `${spacing}px ${spacing}px ${spacing}px 0`,
    paddingLeft: `calc(1em + ${spacing * 4}px)`,
    transition: 'width 300ms', // Assuming default transition duration
    width: '100%',
    '@media (min-width: 960px)': {
      width: '20ch',
    },
  },
}));