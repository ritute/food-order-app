import React from 'react';
import {
  Button,
  Grid,
  Typography,
  Paper,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import MenuItem from './RestaurantMenuItem';

const styles = theme => ({
  title: {
    marginBottom: theme.spacing(2),
  },
  menuPaper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
});

class RestaurantMenu extends React.Component {
  constructor(props) {
    super(props);

    // Add quantity to menu items
    const { menu } = this.props;
    menu.map(menuItem => menuItem.quantity = 0);

    // Convert array to key-value pair for quick lookup based on name (since no ID)
    const newMenu = {};
    menu.map(menuItem => newMenu[menuItem.name] = menuItem);

    this.state = {
      orderTotal: 0,
      menu: newMenu
    };
  }

  onHandleAddQuantity(menuItem) {
    menuItem.quantity++;
    this.setState(prevState => ({
      ...prevState,
      orderTotal: prevState.orderTotal + menuItem.price,
      menu: {
        ...prevState.menu,
        [menuItem.name]: menuItem
      }
    }));
  }

  onHandleRemoveQuantity(menuItem) {
    // Don't allow negative quantity
    if (menuItem.quantity <= 0) return;
    menuItem.quantity--;
    this.setState(prevState => ({
      ...prevState,
      orderTotal: prevState.orderTotal - menuItem.price,
      menu: {
        ...prevState.menu,
        [menuItem.name]: menuItem
      }
    }));
  }

  render() {
    const { classes } = this.props;
    const { menu } = this.state;

    return (
      <React.Fragment>
        <Typography variant="h6" className={classes.title}>Menu</Typography>
        <Paper variant="outlined" className={classes.menuPaper}>
          <Grid container spacing={4}>
            {Object.values(menu).map(menuItem => (
              <MenuItem
                key={menuItem.name}
                menuItem={menuItem}
                onHandleAddQuantity={e => this.onHandleAddQuantity(e)}
                onHandleRemoveQuantity={e => this.onHandleRemoveQuantity(e)}
              />
            ))}
          </Grid>
        </Paper>
        <Grid container direction="column" alignItems="flex-end" spacing={2}>
          <Grid item>
            <Typography variant="body1" className={classes.orderTotal}>Total: ${this.state.orderTotal}</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained">Order Now</Button>
          </Grid>
        </Grid>
    </React.Fragment>
    );
  }
}

export default withStyles(styles)(RestaurantMenu);
