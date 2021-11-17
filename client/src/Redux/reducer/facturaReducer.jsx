import { facturaConstante } from "../constants/tipadosDespacho";
const facturaState = {
    Facturas: [],
    FacturasUsuario: [],
    estado: ""
}

export const facturaReducer = (state = facturaState, {type, payload}) => {
    switch (type) {
        case facturaConstante.GET_FACTURAS:
            return {
                ...state,
                Facturas: payload
            }
        case facturaConstante.PUT_FACTURA:
            return {
                ...state,
                Facturas: payload
            }
        case facturaConstante.GET_FACTURAS_USUARIO:
            return {
                ...state,
                FacturasUsuario: [...payload]
            }
        case facturaConstante.SET_ESTADO:
        return {
            ...state,
            estado: payload
        }
        default:
            return state;
    } 
}