const { createSlice } = require("@reduxjs/toolkit");

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("todoItems");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Error loading from localStorage", e);
    return [];
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("todoItems", serializedState);
  } catch (e) {
    console.error("Error saving to localStorage", e);
  }
};

const initialState = loadFromLocalStorage();

const TodoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    Add: (state, action) => {
      // console.log(action.payload);
      state.push(action.payload);
      saveToLocalStorage(state);
    },
    Remove: (state, action) => {
      const newState = state.filter((item, index) => index !== action.payload);
      saveToLocalStorage(newState);
      return newState;
    },
    Clear: (state) => {
      const newState = []; // Reset state to an empty array
      saveToLocalStorage(newState); // Clear local storage
      return newState;
    },
  },
});

export const { Add, Remove, Clear } = TodoSlice.actions;
export default TodoSlice.reducer;
