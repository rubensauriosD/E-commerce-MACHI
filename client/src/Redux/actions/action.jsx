import axios from "axios";
export const POST_PRODUCT = "POST_PRODUCT";

export const postProduct = (producto) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:3001/lapaginavaaqui`, producto)
      .then((response) => {
        return dispatch({
          type: POST_PRODUCT,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
