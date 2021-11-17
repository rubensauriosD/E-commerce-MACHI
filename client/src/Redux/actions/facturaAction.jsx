import axios from 'axios';
import {facturaConstante} from "../constants/tipadosDespacho";

//traer facturas 
export const getFacturasAdmin = ({ estado }) => {
    return async (dispatch) => {
        try {
        const response = await axios.get(`/factura/admin?estado=${estado ? estado : ""}`,{withCredentials:true});
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

  export const getFacturasUsuario = () => {
    return async (dispatch) => {
        try {
           const response = await axios.get("/factura",{withCredentials:true})
           console.log("lo que llega al action",response.data)
           return dispatch({
               type: facturaConstante.GET_FACTURAS_USUARIO,
               payload: response.data
           })
        } catch (error) {
            console.log('Aqui el error en facturas de usuario: ', error)
        }
    }
}

export const postFactura = (payer, items) => {
    const {nombre, apellido,telefono,calle,altura} = payer
    const nombrecompleto = nombre + ' ' + apellido;
    const direccion = calle + ' ' + altura;
    const ammount = items?.reduce((total, item) => total + item.quantity, 0);
    //const ammount = items.reduce((a, b) => a.quantity + b.quantity);
    const totalPorProducto = items?.map(item=>(item.unit_price)*(item.quantity))
    const cantidadporProducto = items?.map(item=>item.quantity)
    const total = totalPorProducto.reduce((a,b)=>{
        return a + b;
    })
    const arregloDeIdsProductos=items?.map(item=>item.idProductos)
    return (dispatch) => {
        console.log("datos factura ruben",{nombrecompleto,telefono,direccion,arregloDeIdsProductos,ammount,total, cantidadporProducto})
        axios.post(`/factura`, {nombrecompleto,telefono,direccion,arregloDeIdsProductos,ammount,total,cantidadporProducto}, {withCredentials:true})
        .then(()=>  {
            console.log('Los datos de factura fueron enviados al back: Ammount: ', ammount, '/ Total: ', total)
            dispatch({
                type: facturaConstante.POST_FACTURA
            })
        })
        .catch((error)=>console.log('Error al enviar datos factura al back: ', error))
    }
}

export const setEstado = (estado) => {
    return {
        type: facturaConstante.SET_ESTADO,
        payload: estado,
      };
}