import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  CardHeader,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { PRICE_RANGES } from '../util/priceRanges';

const useStyles = makeStyles(theme => ({
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
}));

function getPriceRangeLabel(priceRange) {
  return PRICE_RANGES.find(price => price.value === priceRange).label;
}

// Uses quick solution to bold text based on regex, and breaking string into
// parts around the filter text (taken from stack overflow example)
function getHighlightedName(name, filterText) {
  if (name && filterText) {
    const parts = name.split(new RegExp(`(${filterText})`, 'gi'));
    return <span>{parts.map(part => part.toLowerCase() === filterText.toLowerCase() ? <b key={part}>{part}</b> : part)}</span>;
  } else {
    return name;
  }
}

function RestaurantCard(props) {
  const classes = useStyles();
  const { restaurant, filterText } = props;

  return (
    <Card>
      <CardActionArea component={Link} to={`/restaurants/${restaurant.id}`}>
        <CardHeader
          title={getHighlightedName(restaurant.name, filterText)}
          action={getPriceRangeLabel(restaurant.priceRange)}
        />
        <CardMedia
          className={classes.cardMedia}
          image={restaurant.imageSmallUrl}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {restaurant.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default RestaurantCard;
