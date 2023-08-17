import axios from 'axios';
import { showAlert } from './alerts';
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'data'
        ? 'http://127.0.0.1:8000/api/v1/users/updateMe'
        : 'http://127.0.0.1:8000/api/v1/users/updateMyPassword';
    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully`);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
