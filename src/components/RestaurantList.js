import React from 'react';
import {
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';

import RestaurantCard from './RestaurantCard';

const useStyles = makeStyles(theme => ({
  category: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
}));

function CategoryName({ name }) {
  const classes = useStyles()

  return (
    <Typography className={classes.category} variant="h5">
      {name}
    </Typography>
  );
}

function FeaturedRestaurants({ featuredRestaurants, restaurants: allRestaurants }) {
  return (
    <React.Fragment>
      <CategoryName name='Featured Restaurants' />
      <Grid container spacing={4}>
        {featuredRestaurants.map(featured => {
          const restaurant = allRestaurants[featured.restaurantId];
          return (restaurant &&
            <Grid item key={restaurant.id} xs={12} sm={6} md={4}>
              <RestaurantCard restaurant={restaurant} />
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
}

function AllRestaurants({ restaurants }) {
  return (
    <React.Fragment>
      <CategoryName name='All Restaurants' />
      <Grid container spacing={4}>
        {Object.values(restaurants).map(restaurant => {
          return (
            <Grid item key={restaurant.id} xs={12} sm={6} md={4}>
              <RestaurantCard restaurant={restaurant} />
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
}

function SearchResults({ restaurants: restaurantMap, filterText, priceRangeFilter }) {
  return (
    <React.Fragment>
      <CategoryName name='Results' />
      <Grid container spacing={4}>
        {Object.values(restaurantMap).map(restaurant => {
          // Filter restaurants by search text
          if (restaurant.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) return null;
          // Filter by price range
          if (!priceRangeFilter[restaurant.priceRange]) return null;
          return (
            <Grid item key={restaurant.id} xs={12} sm={6} md={4}>
              <RestaurantCard restaurant={restaurant} filterText={filterText} />
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
}

function RestaurantList(props) {
  const {
    isFiltering,
    filterText,
    priceRangeFilter,
  } = props;
  const { featuredRestaurants, restaurants } = props.restaurantData;

  return (
    isFiltering ?
      <SearchResults
        restaurants={restaurants}
        filterText={filterText}
        priceRangeFilter={priceRangeFilter}
      /> :
      <React.Fragment>
        <FeaturedRestaurants
          featuredRestaurants={featuredRestaurants}
          restaurants={restaurants}
        />
        <AllRestaurants restaurants={restaurants} />
      </React.Fragment>
  );
}

export default RestaurantList;
