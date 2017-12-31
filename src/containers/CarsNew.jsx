import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { createCar } from '../actions/index';

class CarsNew extends Component {
  onSubmit = (values) => {
    this.props.createCar(this.props.garage, values, (car) => {
      this.props.history.push('/');
      return car;
    });
  }

  render() {
    const garageImageStyle = { background: "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.4)), url('../../assets/images/garage.jpg')"};
    const carImageStyle = {
      background: "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.4)), url('../../assets/images/vw_face.jpg')",
      backgroundSize: 'cover'
    };

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
              <Link className="btn btn-cta" to="/">
                Back to List
              </Link>
            </div>
          </div>
        </div>
        <div className="cars-form" style={carImageStyle}>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field
             label="Brand"
             name="brand"
             type="text"
             component={this.renderField}
            />
            <Field
             label="Model"
             name="model"
             type="text"
             component={this.renderField}
            />
            <Field
             label="Owner"
             name="owner"
             type="text"
             component={this.renderField}
            />
            <Field
             label="Plate"
             name="plate"
             type="text"
             component={this.renderField}
            />
            <button className="btn btn-danger" type="submit" disabled={this.props.invalid || this.props.pristine || this.props.submitting}>
             Create Car
            </button>
          </form>
        </div>
      </div>
    );
  }

  renderField({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <div className="form-group">
        <label>{label}</label>
        <input
          className="form-control"
          type={type}
          {...input}
        />
        {touched && (error && <span className="form-error">{error}</span>)}
      </div>
    );
  }
}

function validate(values) {
  const errors = {}
  if (!values.brand) {
    errors.brand = 'Required'
  }
  if (!values.model) {
    errors.model = 'Required'
  }
  if (!values.owner) {
    errors.owner = 'Required'
  }
  if (!values.plate) {
    errors.plate = 'Required'
  } else if (values.plate.match(/^([A-Z]|\-|\d)+$/) === null) {
    errors.plate = 'Should be all caps and no special characters'
  }
  return errors
}

function mapStateToProps(state) {
  return {
    garage: state.garage,
  };
}

export default reduxForm({
  form: 'newCarForm', // a unique identifier
  validate
})(
  connect(mapStateToProps, { createCar })(CarsNew)
);
