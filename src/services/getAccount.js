export const getAccountAddress = () => {
  return JSON.parse(localStorage.getItem("Flipper"))?.address;
};