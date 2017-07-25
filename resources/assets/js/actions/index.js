export function reset(){
    return {
        type: "RESET"
    }
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