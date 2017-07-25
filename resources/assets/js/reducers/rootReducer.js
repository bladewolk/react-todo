const initialState = {
    items: [],
    filter: false,
    dataLoaded: false,
    fetched: false,
    textValue: ''
}

const rootReducer = (state = initialState, action) =>{
    switch (action.type){
        case 'REQUEST_LOAD':{
            return {
                ...state,
                items: action.payload
            }
        }
        case 'DATA_LOADING': {
            return {
                ...state,
                dataLoaded: true
            }
        }
        case 'TOGGLE_FETCHED':{
            return {...state, fetched: !state.fetched}
        }
        case 'ADD':{
            return {
                ...state,
                items: [
                    action.payload,
                    ...state.items
                ]
            }
        }
        case 'DEL':{
            return {
                ...state,
                items:
                    state.items.filter((item, index)=>{
                        return item.id != action.payload
                    })
            }
        }
        case 'DONE':{
            return {
                ...state,
                items: state.items.map((item,index) => {
                    if (item.id == action.payload){
                        item.done = !item.done
                    }
                    return item;
                })
            }
        }
        case 'TOGGLE_FILTER':{
            return {
                ...state,
                filter: !state.filter
            }
        }
        case 'SET_FIELD_VALUE':{
            return {
                ...state,
                textValue: action.payload
            }
        }
        case 'RESET':{
            return {
                ...state,
                textValue: ''
            }
        }
        default:{
            return state;
        }
    }
}

export default rootReducer