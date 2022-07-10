import {useHttp} from "../../hooks/http.hook";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    filters:[],
    activeFilter: "all",
    sortProduct: "all"
}

export const fetchedFilters = createAsyncThunk(
    'filters/fetchedFilters',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/filters");
    } 
)

const underHeaderAppSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        activedFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        changedProducts: (state, action) => {
            state.sortProduct = action.payload;
        }
    },
    extraReducers: (builder) => [
        builder
            .addCase(fetchedFilters.fulfilled, (state, action) => {state.filters = action.payload})
            .addDefaultCase(() => {})
        
    ]
})
   


const {actions, reducer} = underHeaderAppSlice;

export default reducer;
export const {activedFilter, changedProducts} = actions;