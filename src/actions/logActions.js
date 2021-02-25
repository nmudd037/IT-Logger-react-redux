import {
  ADD_LOG,
  CLEAR_CURRENT,
  DELETE_LOG,
  GET_LOGS,
  LOGS_ERROR,
  SEARCH_LOGS,
  SET_CURRENT,
  SET_LOADING,
  UPDATE_LOG,
} from './types';

// Get Logs from Server
export const getLogs = () => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch('https://it-logger-server-v1.herokuapp.com/logs');
    const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: !err.response ? 'Server Down Please Try Again' : err.response.statusText,
    });
  }
};

// Add New Log
export const addLog = (log) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch('https://it-logger-server-v1.herokuapp.com/logs', {
      method: 'POST',
      body: JSON.stringify(log),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    dispatch({
      type: ADD_LOG,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Update a Log
export const updateLog = (log) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`https://it-logger-server-v1.herokuapp.com/logs/${log.id}`, {
      method: 'PATCH',
      body: JSON.stringify(log),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    dispatch({
      type: UPDATE_LOG,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Delete a Log
export const deleteLog = (id) => async (dispatch) => {
  try {
    setLoading();

    await fetch(`https://it-logger-server-v1.herokuapp.com/logs/${id}`, {
      method: 'DELETE',
    });

    dispatch({
      type: DELETE_LOG,
      payload: id,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Search Logs
export const searchLogs = (text) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`https://it-logger-server-v1.herokuapp.com/logs?q=${text}`);

    const data = await res.json();
    dispatch({
      type: SEARCH_LOGS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Set Current Log
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  };
};

// Clear Current Log
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

// Set Loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
