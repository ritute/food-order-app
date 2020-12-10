import {
  Grid,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  AddCircle as AddIcon,
  RemoveCircle as RemoveIcon,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  quantity: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2)
  }
}));

function MenuItem(props) {
  const classes = useStyles();
  const { menuItem } = props;

  return (
    <Grid container item>
      <Grid item xs={2}>
        <Typography variant="body1">${menuItem.price}</Typography>
      </Grid>
      <Grid item xs>
        <Typography variant="body1">{menuItem.name}</Typography>
      </Grid>
      <Grid item container xs={4} justify="center" alignItems="center">
        <IconButton size="small" onClick={e => props.onHandleRemoveQuantity(menuItem)}>
          <RemoveIcon fontSize="inherit" />
        </IconButton>
        <Typography align="center" className={classes.quantity}>{menuItem.quantity}</Typography>
        <IconButton size="small" onClick={e => props.onHandleAddQuantity(menuItem)}>
          <AddIcon fontSize="inherit" />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default MenuItem;
