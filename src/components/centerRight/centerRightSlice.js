import {useHttp} from "../../hooks/http.hook";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    cards:[],
    sortProduct: "all",
    singleCard:[],
    statusLoadingCard: false
};

export const fetchedCard = createAsyncThunk(
    'cards/fetchedCard',
    () => {
        const {request} = useHttp();
        return request('https://fakestoreapi.com/products');
    } 
);

export const formSearch = createAsyncThunk(
    'cards/formSearch',
    (category) => {
        const {name} = category;
        const {request} = useHttp();
        return request(`https://fakestoreapi.com/products/category/${name}`);
    } 
);

export const getSingleCard = createAsyncThunk(
    'cards/getSingleCard',
    (id)=> {
        const {request} = useHttp();
        return request (`https://fakestoreapi.com/products/${id}`)
    }
)



const centerRightSlice = createSlice({
    name: "cards",
    initialState,
    redusers: {
        changedProducts: (state, action) => {
            state.sortProduct = action.payload;
        }
    },
    extraReducers: (builder) => [
        builder
            .addCase(fetchedCard.pending, (state, action) => {state.statusLoadingCard = true})
            .addCase(fetchedCard.fulfilled, (state, action) =>{
                state.statusLoadingCard = false;
                state.cards = action.payload;
                
            })
            .addCase(formSearch.fulfilled, (state, action)=>{
                state.cards = action.payload;
            })
            .addCase(getSingleCard.pending, (state, action) => {state.statusLoadingCard = true})
            .addCase(getSingleCard.fulfilled, (state, action) => {
                state.singleCard = action.payload;
                state.statusLoadingCard = false
            })
            .addDefaultCase(() => {})
    ]
})
   


const {actions, reducer} = centerRightSlice;

export default reducer;

export const {changedProducts} = actions;

