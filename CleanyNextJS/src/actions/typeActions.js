import {attachTokenToHeaders} from "./authActions";
import axios from "axios";
import {BASE_URL} from "../constants";
import {GET_TYPES_SUCCESS, GET_TYPES_FAIL, GET_TYPES_LOADING} from "../slices/typeSlice";

export const getTypes = () => async (dispatch, getState) => {
    dispatch(GET_TYPES_LOADING());
    try {
        const options = attachTokenToHeaders(getState);
        const response = await axios.get(BASE_URL + '/api/type-of-cleaning/', options);

        dispatch(GET_TYPES_SUCCESS({types: response.data}));
    } catch (err) {
        dispatch(GET_TYPES_FAIL(err.response));
    }
};