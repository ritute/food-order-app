import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useHistory,
} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  makeStyles,
  CssBaseline,
} from '@material-ui/core';
import FastfoodIcon from '@material-ui/icons/Fastfood';

import { RESTAURANT_DATA } from '../data/restaurantData';

import FilterableRestaurants from './FilterableRestaurants';
import RestaurantOrder from './RestaurantOrder';

const useStyles = makeStyles(theme => ({
  mainContent: {
    padding: theme.spacing(8),
  },
  toolbarTitle: {
    margin: theme.spacing(1, 1.5),
  },
  link: {
    margin: theme.spacing(1, 2),
  },
}));

// Convert restaurants array to key-value pair (id => restaurant obj)
// for quick lookup based on id
const restaurantData = {
  ...RESTAURANT_DATA,
  restaurants: RESTAURANT_DATA.restaurants.reduce((map, restaurant) => {
    map[restaurant.id] = restaurant;
    return map;
  }, {})
}

// Return random restaurant ID from list
function getSurpriseRestaurantId(restaurants) {
  const restaurantArray = Object.values(restaurants);
  const restaurant = restaurantArray[Math.floor(Math.random() * restaurantArray.length)];

  return restaurant.id;
}

function SurpriseMeLink() {
  const classes = useStyles();
  const history = useHistory();

  function surpriseMe(e) {
    e.preventDefault();
    history.push(`/restaurants/${getSurpriseRestaurantId(restaurantData.restaurants)}`);
  }

  return (
    <Link to='/restaurants' onClick={surpriseMe} className={classes.link}>Surprise Me</Link>
  )
}

function App() {
  const classes = useStyles();

  return (
    <Router>
      <CssBaseline />
      <AppBar elevation={0} color="default" position="static">
        <Toolbar>
          <FastfoodIcon />
          <Typography className={classes.toolbarTitle}>Feed Me</Typography>
          <nav>
            <Link to="/" className={classes.link}>Restaurants</Link>
            <SurpriseMeLink />
          </nav>
        </Toolbar>
      </AppBar>
      <Container component="main" className={classes.mainContent}>
        <Switch>
          <Route exact path="/">
            <FilterableRestaurants restaurantData={restaurantData}/>
          </Route>
          <Route path="/restaurants/:id" render={(props) => {
            const { match : { params : { id } }} = props;
            return (
              <RestaurantOrder restaurant={restaurantData.restaurants.[id]} />
            );
          }}/>
          <Redirect to="/" />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
