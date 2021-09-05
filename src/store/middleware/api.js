import axios from 'axios';
import * as actions from '../api';
import { BASE_URL } from '../../constants';

// eslint-disable-next-line
const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const {
    url, method, data, withCredentials, onStart, onSuccess, onError,
  } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const response = await axios.request({
      baseURL: BASE_URL,
      url,
      method,
      data,
      withCredentials,
    });
    dispatch(actions.apiCallSuccess(response.data));
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    dispatch(actions.apiCallFailed(error.message));
    if (onError) dispatch({ type: onError, payload: { status: 'Error' } });
  }
};

export default api;
