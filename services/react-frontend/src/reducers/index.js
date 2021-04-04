
import { combineReducers } from 'redux'
import * as types from '../constants/actions'
import { DEFAULT_ROUTE } from '../constants/routes'

export const trigger = (state='ready', action) => {
    if (action.type === types.REFRESH_TRIGGER){
        return 
    }
}
export const route = (state=DEFAULT_ROUTE, action) => {
    if (action.type==types.SWITCH_PAGE){
        return action.route
    }
    else{return state}
}

export const balances = (state='ian', action) => {
    if (action.type==types.BALANCES){
        return '100'
    }
    else if (action.type == types.RECEIVE_BALANCES){
        return {
            'ETH': action.balances.result
        }
    }

    else{return state}

}




const rootReducer = combineReducers({
    route, balances
    // user,
    // cookie_info
})

export default rootReducer