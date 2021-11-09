import {imagenConstantes} from "../constants/tipadosDespacho";
const imageState = {
    Images: [],
    Image: {}
}

export const imageReducer = (state = imageState, {type, payload}) => {
    switch (type) {
        case imagenConstantes.POST_IMAGE:
            return {
                ...state,
            };
        case imagenConstantes.GET_IMAGES:
            return {
                ...state,
            Images: payload,
            };
        case imagenConstantes.DELETE_IMAGE:
            return {
            ...state,
            };
        case imagenConstantes.PUT_IMAGE:
            return {
                ...state,
            Image: payload,
            };
        default:
        return state;
    }
}