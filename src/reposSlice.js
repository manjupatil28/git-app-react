
import { createSlice } from '@reduxjs/toolkit';
console.log("reposlice");
const reposSlice = createSlice({
  name: 'repos',
  initialState: {
    repos: [],
    filteredRepos: [],
    filterOptions: {
      language: '',
      dateRange: '',
    },
    isLoading: true,
  },
  reducers: {
    setRepos: (state, action) => {
      state.repos = action.payload;
      state.isLoading = false;
    },
    setFilterOptions: (state, action) => {
      state.filterOptions = action.payload;
    },
    applyFilters: (state) => {
      const { language, dateRange } = state.filterOptions;
      let filteredItems = state.repos;

      if (language) {
        filteredItems = filteredItems.filter(
          (repo) => repo.language && repo.language.toLowerCase() === language.toLowerCase()
        );
      }

      if (dateRange && !isNaN(dateRange)) {
        const today = new Date();
        const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - parseInt(dateRange));
        filteredItems = filteredItems.filter((repo) => {
          const repoDate = new Date(repo.created_at);
          return repoDate >= startDate;
        });
      }

      state.filteredRepos = filteredItems;
    },
  },
});

export const { setRepos, setFilterOptions, applyFilters } = reposSlice.actions;

export const fetchRepos = () => async (dispatch) => {
  try {
    const response = await fetch('https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc');
    const data = await response.json();
    dispatch(setRepos(data.items));
    dispatch(applyFilters());
  } catch (error) {
    console.error('Error fetching repositories:', error);
  }
};

export default reposSlice.reducer;
