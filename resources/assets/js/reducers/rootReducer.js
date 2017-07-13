const initialState = {
    items: [],
    filter: 'FILTER_ALL',
    fetched: false
}

const rootReducer = (state = initialState, action) =>{
    switch (action.type){
        case 'REQUEST_LOAD':{
            return {
                ...state,
                items: action.payload,
                fetched: true
            }
        }
        case 'TOGGLE_FETCHED':{
            return {...state, fetched: !state.fetched}
        }
        case 'ADD':{
            return {
                ...state,
                items: [
                    ...state.items,
                    action.payload
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
        case 'FILTER_ALL':{
            return {
                ...state,
                filter: 'FILTER_ALL'
            }
        }
        case 'FILTER_ACTIVE':{
            return {
                ...state,
                filter: 'FILTER_ACTIVE'
            }
        }
        case 'FILTER_DONE':{
            return {
                ...state,
                filter: 'FILTER_DONE'
            }
        }
        default:{
            return state;
        }
    }
}

export default rootReducer