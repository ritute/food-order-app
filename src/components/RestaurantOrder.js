import { Grid } from '@material-ui/core';

import RestaurantCard from './RestaurantCard';
import RestaurantMenu from './RestaurantMenu';

function RestaurantOrder({ restaurant }) {
 return (
   <Grid container spacing={8}>
     <Grid item xs><RestaurantMenu menu={restaurant.menu}/></Grid>
     <Grid item xs><RestaurantCard restaurant={restaurant}/></Grid>
   </Grid>
  );
}

export default RestaurantOrder;
