import { ADD_TECH, DELETE_TECH, GET_TECHS, SET_LOADING, TECHS_ERROR } from './types';

// Get Techs from server
export const getTechs = () => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch('https://it-logger-server-v1.herokuapp.com/techs');
    const data = await res.json();

    dispatch({
      type: GET_TECHS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: !err.response ? 'Server Down Please Try Again' : err.response.statusText,
    });
  }
};

// Add Tech to server
export const addTech = (tech) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch('https://it-logger-server-v1.herokuapp.com/techs', {
      method: 'POST',
      body: JSON.stringify(tech),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();

    dispatch({
      type: ADD_TECH,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Delete Tech from server
export const deleteTech = (id) => async (dispatch) => {
  try {
    setLoading();

    await fetch(`https://it-logger-server-v1.herokuapp.com/techs/${id}`, {
      method: 'DELETE',
    });

    dispatch({
      type: DELETE_TECH,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
