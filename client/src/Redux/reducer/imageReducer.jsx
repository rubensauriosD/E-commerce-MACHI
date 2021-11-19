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
                Images:[...payload]
            };
        case imagenConstantes.GET_IMAGES:
            return {
                ...state,
            Images: [...payload]
            };
        case imagenConstantes.DELETE_IMAGE:
            return {
            ...state,
            Images: [...payload]
            };
        default:
        return state;
    }
}