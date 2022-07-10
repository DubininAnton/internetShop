
import { useState } from 'react'; 
import { Link } from 'react-router-dom';
import {Formik, Form, useField} from "formik";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import {setButton, 
        setView, 
        userRegistration, 
        statusUserRegistration, 
        myError, 
        getUsersInDataBase, 
        userIdentification, 
        messageSuccessfulLogin,
        thereIsNoSuchUser} from './singInFormSlice';
import {getEmailAndProducts, setProductsFromDB} from '../basket/basketSlice';
import * as Yup from 'yup';
import './singInForm.scss';

const SingInForm =()=> {

    const dispatch = useDispatch();
    const {activeBlock} = useSelector(state => state.singInForm)
    const {activeButton} = useSelector(state => state.singInForm);

    let activeSingup = classNames({'active' : activeButton === true})
    let activeLogin = classNames({'active' : activeButton === false})

    return (
        <div className="form">
            <Link to ='/'>
                <div className="cl-btn-6">
                    <div className="cl-btn-6-in">
                        <div className="cl-btn-6-txt">Закрыть</div>
                    </div>
                </div>
            </Link>
            <ul className="tab-group">
                <li onClick={()=>{dispatch(setView(true)); dispatch(setButton(true))}} className={`tab ${activeSingup}`}><a className = "singup" href="#signup">Sign Up</a></li>
                <li onClick={()=>{dispatch(setView(false)); dispatch(setButton(false))}} className={`tab ${activeLogin}`}><a className='login' href="#login">Log In</a></li>
            </ul>
            
            <div className="tab-content">

            {activeBlock ? <RenderSingUp/> : <RenderLogin/>}
                
            </div>
            
        </div> 
    ) 
}
export default SingInForm;
// Компонент регистрации нового пользователя.
const RenderSingUp = () => {
    const [checkMessage, setCheckMessage] = useState(false);
    const [answerServer, setAnswerServer] = useState('');
    const {statusUser} = useSelector(state => state.singInForm);
    const {messageError} = useSelector(state => state.singInForm);


    /* Функция проврки наличия введенного пользователем при регистрации email. При отсутствии в базе данных введенного email вызывается функция записи нового пользователя в базу данных. Т.к. получение информации из базы данных асинхронная операция проверка наличия в базе email производится в promise */
    const checkUserRegistration = (values) => {
        let usersInDataBase=[];
        let usersEmail=[];

        dispatch(getUsersInDataBase())
            .then(responce => usersInDataBase.push(...responce.payload))
            .then(() => {usersEmail.push(...usersInDataBase.map(item => item.email))})
            .then(() => { 
                if(usersEmail.find((item)=> item === values.email) === undefined) {
                setUsersRegistration(values)
            } else { 
                setCheckMessage(true);
                setTimeout(()=>{
                    setCheckMessage(false)   
                },5000)
            } })
    }
    // Функция записи нового пользователя в базу данных db.json. 
    // Выполняется проверка записи в базу данных и если все прошло успешно, 
    // показывается сообщение, что все ОК, если была ошибка показывается сообщение 
    // что что-то пошло нет так.
    const setUsersRegistration = (values) => {
        dispatch(userRegistration(values))
            .then(responce => {

                if(!responce.error) {
                    dispatch(statusUserRegistration(true));
                    setTimeout(()=>{
                        dispatch(statusUserRegistration(false));
                    },5000)
                } else {
                    setAnswerServer(responce.error.message);
                    dispatch(myError(true));
                    setTimeout(()=>{
                        dispatch(myError(false));
                    },10000)
                }
               
            })
    }

    const dispatch = useDispatch();
    const MyTextField =(props) => {
        const [field, meta] = useField(props);
        return (
            <>
            <div>
                    <input
                        {...field} 
                        required
                        type={props.type} 
                        name={props.name} 
                        className={props.classNameInput} 
                        placeholder={props.placeholder}
                        autoComplete={props.autoComplete}/>
                
            </div>
            {meta.touched && meta.error ? (
              <div className="error">{meta.error}</div>
            ) : null}
          </>
        )
    }
    return (
        <Formik
        initialValues={{Firstname:"",
                        Lastname:"",
                        email:"",
                        password:""}}
                        onSubmit={(values) =>checkUserRegistration(values)} /* Вызов функции по проверке наличия данного email в базе данных */
        validationSchema = {Yup.object({
        email: Yup.string().email("Неправильный формат ввода адреса"),
        password: Yup.string().min(6, "Минимум 6 символов")})}>
        
        {({resetForm})=>(
            <Form>
                <div id="signup">   
                    <h1>Sign Up for Free</h1>
                        
                    <div className="top-row">
                        <MyTextField name="Firstname" 
                                    label = "First Name*" 
                                    classNameInput = "field-wrap" 
                                    type = "text" 
                                    placeholder = "First Name *"/>
                        <MyTextField name="Lastname" 
                                    label = "Last Name*" 
                                    classNameInput = "field-wrap" 
                                    type = "text" 
                                    placeholder = "Last Name *" 
                                    autoComplete="off"/>
                    </div>
                        <MyTextField name="email" 
                                        label = "Last Name*" 
                                        classNameInput = "field-wrap" 
                                        type = "email" 
                                        placeholder = "Email Address *" 
                                        autoComplete="off"/>
                        <MyTextField name="password" 
                                            label = "Set A Password *" 
                                            classNameInput = "field-wrap" 
                                            type = "password" 
                                            placeholder = "Set A Password *" 
                                            autoComplete="off"/>
                
                    <button type="submit" onClick={()=>{setTimeout(()=> {resetForm()},2000)}} className="button button-block">Get Started</button>
                    {statusUser ? <div className='statusUser'>Вы успешно зарегестиррованы. Войдите в учетную запись используя введенные данные.</div> : null}
                    {messageError ? <div className='statusUser'>Что-то пошло нет так. Статус запроса {answerServer} Попробуйте еще раз.</div> : null}
                    {checkMessage ? <div className='statusUser'>Указанный Вами адрес электронной почты уже зарегестрирован в базе.</div> : null}
                </div>
            </Form>
        )}
    </Formik>
    )
}

/* Компонент рендерит блок входа в аккаунт */
const RenderLogin = () => {
    const dispatch = useDispatch();
    const successfulLogin = useSelector(state=>state.singInForm.successfulLogin)
    const noUser = useSelector(state=> state.singInForm.noUser)

    /* Функция получения всех пользователей, зарегестированных в DataBase и проверки наличия искомого пользователя */
    const checkUserInDataBase =(values) => {
        let usersInDataBase=[];
        let user=[];

        dispatch(getUsersInDataBase()) /* Запрос на получение всех пользователей в базе данных */
            .then(responce => usersInDataBase.push(...responce.payload)) 
            .then(()=> { user = usersInDataBase.filter(item => item.email === values.email && item.password === values.password)})
            .then(()=> {
                if(user.length !==0) {
                    dispatch(userIdentification(user)) /* Запись найденного пользователя в базу на время его пребывания в системе */
                    dispatch(messageSuccessfulLogin(true)) /* Оповещение пользователя об удачном входе в систему */
                    productsFromDB(user) /* Проверка наличия ранее выбранных товаров входящим пользователем и запись их в корзину */
                    setTimeout(()=>{
                        dispatch(messageSuccessfulLogin(false))
                    },3000)
                } else {
                    dispatch(thereIsNoSuchUser(true)); /* Оповещение пользователя об отсутствии в базе такого пользователя  */
                    setTimeout(()=>{dispatch(thereIsNoSuchUser(false))},3000)
                }
            })
       
    }

    /* Проверка наличия ранее выбранных товаров входящим пользователем и запись их в корзину */
    const productsFromDB = (user) => {

        dispatch(getEmailAndProducts()) /* Получаю всех пользователей и их продукты из db.json */
            .then(responce => {
                
                try {
                    for(let i=0; i <= responce.payload.length; i++) {
              
                        let index = responce.payload.filter(item => item.Email === user[0].email)
                      
                        if(index) {
                            
                            dispatch(setProductsFromDB(index[0].productsInBasket)) /* Запись в корзину из db.json выбранных ранее товаров входящи пользователем */
                        }
                    }
                } catch{}
            })
    }

    const MyTextField =(props) => {
        const [field, meta] = useField(props);
        return (
            <>
            <div>
                    <input
                        {...field} 
                        required
                        type={props.type} 
                        name={props.name} 
                        className={props.classNameInput} 
                        placeholder={props.placeholder}
                        autoComplete={props.autoComplete}/>
                
            </div>
            {meta.touched && meta.error ? (
              <div className="error">{meta.error}</div>
            ) : null}
          </>
        )
    }
    return (
        <Formik initialValues={{email:"",
                                password:""}}
                                onSubmit={(values) =>checkUserInDataBase(values)}
            validationSchema = {Yup.object({
            email: Yup.string().email("Неправильный формат записи адреса"),
            password: Yup.string().min(6, "Минимум 6 символов")})}>
            {({resetForm})=>(
                <Form>
                    <div id="login">   
                        <h1>Welcome Back!</h1>
                            <MyTextField name="email" 
                                label = "Last Name*" 
                                classNameInput = "field-wrap" 
                                type = "email" 
                                placeholder = "Email Address *" 
                                autoComplete="off"/>
                            <MyTextField name="password" 
                                label = "Set A Password *" 
                                classNameInput = "field-wrap" 
                                type = "password" 
                                placeholder = "Set A Password *" 
                                autoComplete="off"/>
                        <p className="forgot"><a href="#top">Forgot Password?</a></p>
                    
                        <button type="submit" onClick={()=>{setTimeout(()=> {resetForm()},2000)}} className="button button-block">Log In</button>
                        {successfulLogin ? <div className='statusUser'>Вы успешно вошли в систему</div> : null}
                        {noUser ? <div className='statusUser'>Пользователь не найден или неправильно введен логин или пароль</div> : null}
                    </div>

                </Form>
            )}
            </Formik>
    )
}

