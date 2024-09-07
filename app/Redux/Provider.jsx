"use client";
const { Provider } = require("react-redux");
const { store } = require("./Store");

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
