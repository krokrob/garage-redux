import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { fetchCar, destroyCar } from '../actions/index';

class CarsShow extends Component {
  componentDidMount() {
    this.props.fetchCar(this.props.match.params.id);
  }

  handleDeleteClick = () => {
    this.props.destroyCar(this.props.car.id, () => {
      this.props.history.push('/');
    })
  }

  render() {
    const { car } = this.props;
    if (!car) {
      return <p>Loading...</p>;
    }
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
            <div className="garage-description">
              Our garage is the best.
              Reasonable price, always on time, we are the best (and fictionnal).
            </div>
            <div className="text-center">
              <Link className="btn btn-cta" to="/">
                Back to List
              </Link>
            </div>
          </div>
        </div>
        <div className="cars-list">
          <div className="car">
            <div className="car-image">
              <img src="../../assets/images/white_logo_black_square.png" alt=""/>
            </div>
            <div className="car-body">
              <div className="car-info">
                <h4>{car.brand} - {car.model}</h4>
                <p><strong>Owner:</strong> {car.owner}</p>
                <div className="car-plate">
                  {car.plate}
                </div>
              </div>
              <div className="car-destroy">
                <div className="btn btn-danger" onClick={this.handleDeleteClick}>
                  Delete
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const car = state.cars.find((car) => car.id === parseInt(ownProps.match.params.id));
  return { car: car };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCar: fetchCar,
    destroyCar: destroyCar
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsShow);
