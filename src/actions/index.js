export const FETCH_CARS = 'FETCH_CARS';
export const CAR_CREATED = 'CAR_CREATED';
export const FETCH_CAR = 'FETCH_CAR';
export const DESTROY_CAR = 'DESTROY_CAR';
const ROOT_URL = 'https://wagon-garage-api.herokuapp.com';

export function fetchCars(garage) {
  const promise = fetch(`${ROOT_URL}/${garage}/cars`)
    .then(response => response.json());

  return {
    type: FETCH_CARS,
    payload: promise
  }
}

export function createCar(garage, body, callback) {
  const request = fetch(`${ROOT_URL}/${garage}/cars`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(response => response.json())
    .then(callback);

  return {
    type: CAR_CREATED,
    payload: request
  };
}

export function fetchCar(carId) {
  const promise = fetch(`${ROOT_URL}/cars/${carId}`)
    .then(response => response.json());

  return {
    type: FETCH_CAR,
    payload: promise
  }
}

export function destroyCar(carId, callback) {
  const request = fetch(`${ROOT_URL}/cars/${carId}`,{
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: carId
  }).then(response => response.json())
    .then(callback);

  return {
    type: DESTROY_CAR,
    payload: request
  }
}


