import { facturaConstante } from "../constants/tipadosDespacho";
const facturaState = {
    Facturas: [],
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
        default:
            return state;
    } 
}