import customFetch from '../../utils/axios';

export const regiterUserThunk = async (user, thunkAPI) => {
  try {
    const response = await customFetch.post('/auth/register', user);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const loginUserThunk = async (user, thunkAPI) => {
  try {
    const response = await customFetch.post('/auth/login', user);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const updateUserThunk = async (user, thunkAPI) => {
  try {
    const response = await customFetch.patch('/auth/updateUser', user, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
    return thunkAPI.dispatch.rejectWithValue(error.response.data.msg);
  }
};
