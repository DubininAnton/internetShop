import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    productsInBasket:[], /* Загрузка продуктов из db.json при входе в аккаунт если таковые имеются  */
    autorisation: false, /* При значении noAutorisation выводится модальное окно с сообщением что пользователь не вошел в свой аккаунт, а при значении emptyBasket, что корзина пуста. Срабатывает при нажатии кнопки MyCart. Логика в файле basket.js */
    renderCardsNow: false,
};
/* Удаляю пользователя и его товары из db.json. При формировании новых данных при выходе из аккаунта и их записи в db.json.
Удаление происходит по id */

export const delEmailAndProducts = createAsyncThunk(
    'basket/setEmailAndProducts',
    (payload)=> {
        console.log(payload)
        const {request} = useHttp();
        return request (`http://localhost:3001/emailAndProducts/${payload}`, "DELETE")
    }
)

// Записываю эл.адрес и выбранные товары в db.json
export const setEmailAndProducts = createAsyncThunk(
    'basket/setEmailAndProducts',
    (payload)=> {
        const {request} = useHttp();
        return request ("http://localhost:3001/emailAndProducts", 'POST', JSON.stringify(payload))
    }
)



/* Получаю эл.адрес и выбранные товары из db.json при выходе из аккаунта, чтобы проверить наличие уже данного пользователя в разделе
с товарами и перезаписать его */

export const getEmailAndProducts = createAsyncThunk(
    'basket/setEmailAndProducts',
    ()=> {
        const {request} = useHttp();
        return request ("http://localhost:3001/emailAndProducts")
    }
)

const basketSlice = createSlice({
    name: 'basketSlice',
    initialState,
    reducers: {
        setProductsInBasket: (state, action) => {
            state.productsInBasket.push(action.payload)
        },
        removeProductInBasket: (state, action) => {
            state.productsInBasket = state.productsInBasket.filter(card => card.id !== action.payload) /* Удаляю товар из  productsInBasket при нажатии кнопки удалить на товаре в корзине.*/
        },
        setEmptyBasket: (state, action) => {
            state.productsInBasket = action.payload;
        },
        setProductsFromDB: (state, action) => { /* Загрузка продуктов из db.json при входе в аккаунт если таковые имеются. Команда приходит из файла singInForm  */
            state.productsInBasket = action.payload;
        },
        getAutorisation: (state, action) => {
            state.autorisation = action.payload;
        },
        renderCards:(state, action) => {
            state.renderCardsNow = action.payload; /* Имеет положение false или true и используется из файла basket для рендеринга карточек товаров расположенных в productsInBasket*/
        }
}})

const {actions, reducer} = basketSlice;

export default reducer;

export const {setProductsInBasket, setEmptyBasket, setProductsFromDB, getAutorisation, notificationEmptyBasket, renderCards, removeProductInBasket} = actions;