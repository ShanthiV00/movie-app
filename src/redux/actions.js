import {GET_LOGIN_DATA, ADD_LOGIN_DATA, GET_MOVIE_DATA} from './actionType'

export function getLoginData(data) {
    return { type: GET_LOGIN_DATA, payload: data };
}

export function addLoginData(data) {
    return { type: ADD_LOGIN_DATA, payload: data };
}

export function addMovieData(data) {
    return { type: GET_MOVIE_DATA, payload: data };
}