import { facturaConstante } from "../constants/tipadosDespacho";
const facturaState = {
    Facturas: [],
    FacturasUsuario: []
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
        default:
            return state;
    } 
}