import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { fetchCars } from '../actions/index';

class CarsIndex extends Component {
  componentDidMount() {
    this.props.fetchCars(this.props.garage);
  }

  render() {
    const garageImageStyle = { background: "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.4)), url('../../assets/images/garage.jpg')"};
    return(
      <div className="app">
        <div className="garage">
          <div className="garage-image" style={garageImageStyle}>
            <div className="garage-logo">
              <img src="../../assets/images/white_logo_red_circle.png" alt=""/>
            </div>
          </div>
          <div className="garage-info">
            <h3 className="text-center">{this.props.garage}</h3>
            <div className="garage-description">
              Our garage is the best.
              Reasonable price, always on time, we are the best (and fictionnal).
            </div>
            <div className="text-center">
              <Link className="btn btn-cta" to="/cars/new">
                Add a Car
              </Link>
            </div>
          </div>
        </div>
        <div className="cars-list">
          {this.renderCars()}
        </div>
      </div>
    );
  }

  renderCars(){
    return this.props.cars.map((car) => {
      return(
        <div className="car" key={car.id}>
          <div className="car-image">
            <img src="../../assets/images/white_logo_black_square.png" alt=""/>
          </div>
          <div className="car-info">
            <h4>{car.brand} - {car.model}</h4>
            <p><strong>Owner:</strong> {car.owner}</p>
          </div>
        </div>
      );
    });
  }
}

function mapStateToProps(state) {
  return {
    garage: state.garage,
    cars: state.cars
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchCars: fetchCars },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsIndex);

