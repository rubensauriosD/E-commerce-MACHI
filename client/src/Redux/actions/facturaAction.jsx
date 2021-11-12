import axios from 'axios';
import {facturaConstante} from "../constants/tipadosDespacho";

//traer facturas 
export const getFacturasAdmin = () => {
    return async (dispatch) => {
        try {
        const response = await axios.get(`/factura`,{withCredentials:true});
        return dispatch({
            type: facturaConstante.GET_FACTURAS,
            payload: response.data,
        });
    } catch (err) {
        console.log(err);
        }
    };
};

export const putFactura = ({ id }) => {
    return (dispatch) => {
      axios
        .put(`/factura/${id}`/* ,{withCredentials:true} */)
        .then((facturaUpdated) => {
            return dispatch({
            type: facturaConstante.PUT_FACTURA,
            payload: facturaUpdated.data,
            });
        })
        .catch((err) => {
            console.log(err);
        });
    };
  };