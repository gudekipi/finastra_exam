import { getUsers as getUsersAPI } from '../../api/users';
import { fetchUsers, fetchUsersSuccess, fetchUsersFailure } from './userReducers';

export const getUsers = () => async (dispatch) => {
  dispatch(fetchUsers());

  try {
    const users = await getUsersAPI();
    dispatch(fetchUsersSuccess(users));
  } catch (error) {
    dispatch(fetchUsersFailure(error.message));
  }
};