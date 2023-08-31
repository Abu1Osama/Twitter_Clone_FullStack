export const setData = (key, data) => {
    localStorage.setItem(key, (data));
  };


  export const getData = (key) => {
    return (localStorage.getItem(key));
  };


  export const removeData = (key) => {
    localStorage.removeItem(key);
  };
  