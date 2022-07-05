import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { createJobThunk, editJobThunk, deleteJobThunk } from './jobThunk';
const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

export const createJob = createAsyncThunk('job/createJob', createJobThunk);

export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk);

export const editJob = createAsyncThunk('job/editJob', editJobThunk);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleJobChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Job created !');
    },
    [createJob.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    [deleteJob.fulfilled]: (state, action) => {
      toast.success(action.payload);
    },
    [deleteJob.rejected]: (state, action) => {
      toast.error(action.payload);
    },
    [editJob.pending]: (state) => {
      state.isLoading = true;
    },
    [editJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Job modified !');
    },
    [editJob.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
  },
});

export const { handleJobChange, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
