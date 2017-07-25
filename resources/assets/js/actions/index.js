import fetch from 'isomorphic-fetch'

export function reset(){
    return {
        type: "RESET"
    }
}

export function dataloader(){
    return {type: 'DATA_LOADING'}
}

export function add(item){
    return {
        type: "ADD",
        payload: item
    }
}

export function del(index) {
    return{
        type: "DEL",
        payload: index
    }
}

export function load(data){
    return{
        type: 'REQUEST_LOAD',
        payload: data
    }
}

export function done(key){
    return {
        type: 'DONE',
        payload: key
    }
}

export function toggleFilter(){
    return {
        type: 'TOGGLE_FILTER',
    }
}
export function toggleFetched(){
    return {
        type: 'TOGGLE_FETCHED'
    }
}

export function setTextFieldValue(value){
    return {
        type: 'SET_FIELD_VALUE',
        payload: value
    }
}

export function fetchGetTodos(done) {
    return dispatch => {
        dispatch(toggleFilter())
        return fetch('/api/todo?done='+done)
            .then(response => response.json())
            .then(json => {
                    dispatch(toggleFetched())
                    dispatch(load(json))
                }
            )
    }
}

export function fetchAddTodo(item){
    return dispatch => {
        return fetch('/api/todo', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text: item})
        })
            .then(response => response.json())
            .then(json => {
                    dispatch(toggleFetched())
                    dispatch(add(json))
                    dispatch(reset())
                }
            )
    }
}

export function fetchDeleteTodo(id){
    return dispatch => {
        return fetch('/api/todo/'+id, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({_method: 'DELETE'})
        })
            .then(response => response.json())
            .then(json => {
                    dispatch(toggleFetched())
                    dispatch(del(id))
                }
            )
    }
}

export function fetchUpdateTodo(id){
    return dispatch => {
        return fetch('/api/todo/'+id, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({_method: 'PATCH'})
        })
            .then(response => response.json())
            .then(json => {
                    dispatch(toggleFetched())
                    dispatch(done(id))
                }
            )
    }
}