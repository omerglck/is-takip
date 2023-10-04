import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainJobs: [],
  jobs: [],
  initialized: false, // serverda sorun varsa kontrol etmek için
  isError: false,// hatalı geldiyse
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
      // ana dizide filtreleme güncelleme işlemlerini yapmak yerine oluşturduğumuz dizide yaparız.
      // çünkü ana dizide değişiklik yaparsak veride değişiklik yapmış oluruz ve program patlar.
      state.mainJobs = action.payload;
      state.initialized = true;
      state.isError = false;
    },
    setError: (state) => {
      state.initialized = true;
      state.isError = true;
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    filterBySearch: (state, action) => {
      const query = action.payload.toLowerCase();

      const filter = state.mainJobs.filter((job) =>
        job.company.toLowerCase().includes(query)
      );
      state.jobs = filter;
    },
    filterByStatus: (state, action) => {
      const filtered = state.mainJobs.filter(
        (job) => job.status === action.payload
      );
      state.jobs = filtered;
    },
    filterByType: (state, action) => {
      state.jobs = state.mainJobs.filter((job) => job.type === action.payload);
    },
    sortJobs: (state, action) => {
      switch (action.payload) {
        case "A-Z":
          // localCompare:Kullandığımız bilgisaya göre dili algılayıp ona göre sıralama yapar.
          // örn ingilizce de ü harfi yok localCompare kullanmazsak sıralamayı yanlış yapar.
          state.jobs.sort((a, b) => a.company.localeCompare(b.company));
          break;
        case "Z-A":
          state.jobs.sort((a, b) => b.company.localeCompare(a.company));
          break;
        case "En Yeni":
          state.jobs.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "En Eski":
          state.jobs.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
      }
    },
    clearFilters: (state) => {
      state.jobs = state.mainJobs;
    },
  },
});

export const {
  setJobs,
  setError,
  addJob,
  filterBySearch,
  filterByStatus,
  filterByType,
  sortJobs,
  clearFilters,
} = jobSlice.actions;

export default jobSlice.reducer;
