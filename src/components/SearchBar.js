import {
  Button,
  TextField,
  FormControlLabel,
  FormLabel,
  FormControl,
  FormGroup,
  Checkbox,
  Grid,
  makeStyles
} from '@material-ui/core';

import { PRICE_RANGES } from '../util/priceRanges';

const useStyles = makeStyles(theme => ({
  form: {
    marginBottom: theme.spacing(8),
  },
}));

function PriceRangeFilters({ priceRangeFilter, onPriceRangeFilterChange }) {
  return (
    <FormGroup row={true}>
      {PRICE_RANGES.map(priceRange => (
        <FormControlLabel
          label={priceRange.label}
          key={priceRange.value}
          control={
            <Checkbox
              color="primary"
              value={priceRange.value}
              checked={priceRangeFilter[priceRange.value]}
              onChange={e => onPriceRangeFilterChange(e.target.value, e.target.checked)}
            />
          }
        />
      ))}
    </FormGroup>
  );
}

function SearchBar(props) {
  const classes = useStyles();

  return (
    <form className={classes.form} noValidate>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            placeholder="Search Restaurants"
            fullWidth={true}
            value={props.filterText}
            onChange={e => props.onFilterTextChange(e.target.value)}
          />
        </Grid>
        <Grid item>
          <FormControl component="fieldset">
            <FormLabel component="legend">Price Range:</FormLabel>
            <PriceRangeFilters
              priceRangeFilter={props.priceRangeFilter}
              onPriceRangeFilterChange={props.onPriceRangeFilterChange}
            />
          </FormControl>
        </Grid>
        <Grid item>
          {/* "Clear" is not really the right UI term here as the default state is not
            actually clear - it has all price ranges enabled to show all restaurants */}
          <Button variant="contained" onClick={props.onHandleFilterClear}>Clear</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default SearchBar;
