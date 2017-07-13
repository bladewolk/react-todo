
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

export function filter(filter){
    return {
        type: filter,
    }
}