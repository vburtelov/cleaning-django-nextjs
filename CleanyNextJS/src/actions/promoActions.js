import {attachTokenToHeaders} from "./authActions";
import axios from "axios";
import {BASE_URL} from "../constants";
import {GET_PROMO_LOADING, GET_PROMO_FAIL, GET_PROMO_SUCCESS} from "../slices/promoSlice";

export const getPromos = () => async (dispatch, getState) => {
    dispatch(GET_PROMO_LOADING());
    try {
        const options = attachTokenToHeaders(getState);
        const response = await axios.get(BASE_URL + '/api/promocodes/', options);

        dispatch(GET_PROMO_SUCCESS({promos: response.data}));
    } catch (err) {
        dispatch(GET_PROMO_FAIL(err.response));
    }
};