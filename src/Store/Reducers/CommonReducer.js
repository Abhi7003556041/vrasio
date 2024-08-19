import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dashboardDetails:{},
    currencyDetails:  {
        "id": 2,
        "title": "US Dollars",
        "code": "USD",
        "logo": "IMG_6929_1708057219.jpeg",
        "currency_symbol": "$",
        "status": "A",
        "deleted_at": null,
        "created_at": "2024-02-14T05:29:42.000000Z",
        "updated_at": "2024-02-16T04:20:20.000000Z",
        "logowithpath": "https://www.p82v1.updateapplications.com/vrasio/backend/uploads/currency/IMG_6929_1708057219.jpeg"
      },
    languageDetails:{},
    favouriteList:[],
};

export const commonReducer = createSlice({
    name: 'commonData',
    initialState,
    reducers: {
       setDashboardDetails:(state, action) => {
        state.dashboardDetails = action.payload
    },
    setCurrencyDetails:(state, action) => {
        state.currencyDetails = action.payload
    },
    setLanguageDetails:(state, action) => {
        state.languageDetails = action.payload
    },
    setTotalFavourite:(state, action) => {
        state.favouriteList = action.payload
    },
    setFavouriteList:(state, action) => {
        state.favouriteList.find(favourite => favourite.slug == action.payload.slug) ?
         state.favouriteList = state.favouriteList.filter(favourite => favourite.slug != action.payload.slug) :
        state.favouriteList = state.favouriteList.concat(action.payload)
    }
    },
});


export const {
    setDashboardDetails,
    setCurrencyDetails,
    setLanguageDetails,
    setFavouriteList,
    setTotalFavourite
} = commonReducer.actions;

export default commonReducer.reducer;
