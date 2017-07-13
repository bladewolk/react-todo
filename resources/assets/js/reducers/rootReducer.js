const initialState = {
    items: []
}

const rootReducer = (state = initialState, action) =>{
    switch (action.type){
        case 'REQUEST_LOAD':{
            return {
                ...state,
                items: action.payload
            }
        }
        case 'ADD':{
            return {
                ...state,
                items: [
                    ...state.items,
                    {
                        name: action.payload,
                        done: false
                    }
                ]
            }
        }
        case 'DEL':{
            return {
                ...state,
                items:
                    state.items.filter((item, index)=>{
                        return index != action.payload
                    })
            }
        }
        case 'DONE':{
            return {
                ...state,
                items: state.items.map((item,index) => {
                    if (index == action.payload){
                        item.done = !item.done
                    }
                    return item;
                })
            }
        }
        default:{
            return state;
        }
    }
}

export default rootReducer