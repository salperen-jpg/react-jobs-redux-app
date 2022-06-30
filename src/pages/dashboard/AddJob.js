import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import FormRowSelect from '../../components/FormRowSelect';
import {
  clearValues,
  handleJobChange,
  createJob,
} from '../../features/job/jobSlice';
import { useEffect } from 'react';

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error('Please provide all infos');
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleJobChange({ name, value }));
  };

  useEffect(() => {
    dispatch(
      handleJobChange({
        name: 'jobLocation',
        value: user.location,
      })
    );
  }, []);
  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'Edit job' : 'Add job'}</h3>
        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            value={jobLocation}
            handleChange={handleChange}
          />
          <FormRowSelect
            name='jobType'
            value={jobType}
            handleChange={handleChange}
            options={jobTypeOptions}
            labelText='job type'
          />
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleChange}
            options={statusOptions}
            labelText='Status'
          />
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={() => dispatch(clearValues())}
            >
              Clear
            </button>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
