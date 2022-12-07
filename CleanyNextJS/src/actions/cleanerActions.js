import {attachTokenToHeaders} from "./authActions";
import axios from "axios";
import {BASE_URL} from "../constants";
import { GET_CLEANER_FAIL, GET_CLEANER_LOADING, GET_CLEANER_SUCCESS } from '../slices/cleanerSlice';

export const getCleaners = () => async (dispatch, getState) => {
    dispatch(GET_CLEANER_LOADING());
    try {
        const options = attachTokenToHeaders(getState);
        const response = await axios.get(BASE_URL + '/api/cleaner/', options);

        dispatch(GET_CLEANER_SUCCESS({cleaners: response.data}));
    } catch (err) {
        dispatch(GET_CLEANER_FAIL(err.response));
    }
};