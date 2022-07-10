import { useHttp } from "../../hooks/http.hook";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    // usersInDataBase:[],
    activeButton: true,
    activeBlock: true,
    statusUser: false,
    messageError: false,
    userInSystem:[],
    successfulLogin: false,
    noUser: false,
    smShow: false, /* Показ или закрытие модального окна о выходе из системы */
    showModalAboutRegistration: false, /* Показ или закрытие модального окна о необходимости входа в аккаунт или регистрации при наполнеии корзины */
};
// Записываю нового пользователя в базу данных
export const userRegistration = createAsyncThunk(
    'singInForm/userRegistration',
    (payload)=> {
        const {request} = useHttp();
        return request ("http://localhost:3001/person", 'POST', JSON.stringify(payload))
    }
)
// Получаю всех пользователей из базы данных
export const getUsersInDataBase = createAsyncThunk(
    'singInForm/getUsersInDataBase',
    ()=> {
        const {request} = useHttp();
        return request ("http://localhost:3001/person")
    }
)


const singInFormSlice = createSlice({
    name: "singInForm",
    initialState,
    reducers: {
        setButton: (state, action) => {
            state.activeButton = action.payload;
        },
        setView: (state, action) => {
            state.activeBlock = action.payload;
        },
        statusUserRegistration: (state, action) => {
            state.statusUser = action.payload;
        },
        myError: (state, action) => {
            state.messageError = action.payload;
        },
        userIdentification: (state, action) => {
            state.userInSystem = action.payload;
        },
        messageSuccessfulLogin: (state, action)=> { /* Оповещение пользователя об удачном входе в систему true and false */
            state.successfulLogin = action.payload;
        },
        thereIsNoSuchUser: (state, action) => {
            state.noUser = action.payload;
        },
        setSmShow: (state, action) => {
            state.smShow = action.payload;
        },
        showModal: (state, action) => {
            state.showModalAboutRegistration = action.payload;
        }
        // getUsersInDataBase: (state, action) => {        
        //     state.usersInDataBase = action.payload;
        // },
        // extraReducers: (builder) => [
        //     builder
        //         .addCase(getUsersInDataBase.fulfilled, (state, action) => {state.usersInDataBase.push(action.payload)})
        //         .addDefaultCase(() => {})
        // ]
        
    }
});

const {actions, reducer} = singInFormSlice;

export default reducer;

export const {setButton, 
                setView, 
                statusUserRegistration, 
                myError, 
                userIdentification, 
                messageSuccessfulLogin, 
                thereIsNoSuchUser,
                setSmShow, 
                showModal} = actions;