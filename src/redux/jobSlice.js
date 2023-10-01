import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  initialized: false,
  isError: false,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
      state.initialized = true;
      state.isError = false;
    },
    setError: (state) => {
      state.initialized = true;
      state.isError = true;
    },
  },
});

export const { setJobs, setError } = jobSlice.actions;

export default jobSlice.reducer;
