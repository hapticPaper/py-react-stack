
import * as types from '../constants/actions'
import { useDispatch } from "react-redux";


export const switchPage = (route) => ({
    type: types.SWITCH_PAGE,
    route
})

export const refreshData = (level) => ({
    type: types.REFRESH_TRIGGER,
    triggeredAt: Date.now(),
    level: level
})

export const fetchBalances = (wallet) => ({
    type: types.WALLET,
    wallet
})

export const receiveBalances = (dict) =>({
    
    type: types.RECEIVE_BALANCES,
    balances: dict,
    receivedAt: Date.now(),
    user: null

})



const shouldFetchBalance = (state, wallet) => {
    const walletBalance = state.walletBalance;
    const coin = walletBalance[wallet] || {};

    const status = state.walletBalance.isFetching
    const {startDate, endDate} = state.dateFilters
    
    
    //console.log("test if should download..for "+subscription + ":" + Object.entries(astraUsageData).map(([k,v])=>`${k}:${v}`))//new Date()+ status+':' + subscriptions)
    //console.log("Filters to match:" +new Date(subData.startDate).getTime(),new Date(startDate).getTime() +":::"+ new Date(subData.endDate).getTime() , new Date(endDate).getTime())

    if (status){ return false}
    else if (new Date(coin.startDate).getTime() != new Date(startDate).getTime() || new Date(coin.endDate).getTime() != new Date(endDate).getTime()){
        return true
    }
    else if (!walletBalance[wallet]) { 
        return true 
    }
    else{
        console.log("Have data, no new dates, stopping.")
        return false
    }
}


export const fetchData = (url, requester,  receiver, tag=undefined, secondReciever=false) => dispatch => {

    //dispatch(requester(tag))
    fetch(url) //`${API_HOST}/subs`)
    .then(response => response.json())
    .then(data => {
        console.log(data)  
        dispatch(receiver(data))
        if (secondReciever){
            dispatch(secondReciever(data))
        } 
    })
    .catch((error)=>{
    console.log("Download failed: " + error, url, requester,  receiver, tag, secondReciever)
});
}



export const fetchBalancesNeeded = (wallet) => (dispatch, getState) => {
    //console.log("Check to dl breakdown "+ new Date())
    if (shouldFetchBalance(getState(), wallet)) {
        //const {startDate, endDate} = getState().dateFilters
        //const url = urls.BREAKDOWN_URL(subscription, startDate, endDate)
        //console.log(`Fetch url ${url}`)
        const url = 'https://api.etherscan.io/api?module=account&action=balance&address=0xc1817a207e1f7bdc3ace6283d071c93d190c330c&tag=latest&apikey=J3XZIH3UYE31ZW9TSYKZQ2P7ID3BYR8M8F'
        return dispatch(fetchData(url, wallet, receiveBalances ))
    }
}

