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
    const required = value => value ? undefined : 'Required';

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
             validate={required}
             component={this.renderField}
            />
            <Field
             label="Model"
             name="model"
             type="text"
             validate={required}
             component={this.renderField}
            />
            <Field
             label="Owner"
             name="owner"
             type="text"
             validate={required}
             component={this.renderField}
            />
            <Field
             label="Plate"
             name="plate"
             type="text"
             validate={required}
             component={this.renderField}
            />
            <button className="btn btn-danger" type="submit" disabled={this.props.pristine || this.props.submitting}>
             Create Car
            </button>
          </form>
        </div>
      </div>
    );
  }

  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          type={field.type}
          {...field.input}
        />
        {field.touched && (field.error && <span>{field.error}</span>)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    garage: state.garage,
  };
}

export default reduxForm({
  form: 'newCarForm' // a unique identifier
})(
  connect(mapStateToProps, { createCar })(CarsNew)
);
