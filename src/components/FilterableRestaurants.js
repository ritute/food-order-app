import React from 'react';

import SearchBar from './SearchBar';
import RestaurantList from './RestaurantList';

const DEFAULT_STATE = {
  filterText: '',
  priceRangeFilter: {
    0: true,  // $
    1: true,  // $$
    2: true   // $$$
  },
  isFiltering: false,
};

class FilterableRestaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handlePriceRangeFilterChange = this.handlePriceRangeFilterChange.bind(this);
    this.handleFilterClear = this.handleFilterClear.bind(this);
  }

  handleFilterTextChange(filterText) {
    const isFiltering = filterText !== '';
    this.setState({
      filterText,
      isFiltering: isFiltering,
    });
  }

  handlePriceRangeFilterChange(priceRange, value) {
    this.setState(prevState => ({
      priceRangeFilter: {
        ...prevState.priceRangeFilter,
        [priceRange]: value
      },
      isFiltering: true,
    }));
  }

  handleFilterClear() {
    this.setState(DEFAULT_STATE);
  }

  render() {
    return (
      <React.Fragment>
        <SearchBar
          filterText={this.state.filterText}
          priceRangeFilter={this.state.priceRangeFilter}
          onFilterTextChange={this.handleFilterTextChange}
          onPriceRangeFilterChange={this.handlePriceRangeFilterChange}
          onHandleFilterClear={this.handleFilterClear}
        />
        <RestaurantList
          restaurantData={this.props.restaurantData}
          filterText={this.state.filterText}
          priceRangeFilter={this.state.priceRangeFilter}
          isFiltering={this.state.isFiltering}
        />
      </React.Fragment>
    );
  }
}

export default FilterableRestaurants;
