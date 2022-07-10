
import './headerApp.scss';
import {Formik, Form, useField} from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { formSearch } from '../centerRight/centerRightSlice';
import { Link } from 'react-router-dom';
import {
    usePopoverState,
    Popover,
    PopoverDisclosure,
  } from "reakit/Popover";
import { userIdentification, setSmShow } from '../singInForm/singInFormSlice';
import { Modal } from 'react-bootstrap';
import {setEmailAndProducts, getEmailAndProducts, setEmptyBasket, delEmailAndProducts, getAutorisation} from '../basket/basketSlice';



const HeaderApp = () => {
    const {productsInBasket} = useSelector(state=>state.basketSlice); /* Необходим для формирования над иконкой Mycart красного круга с количеством товара в корзине */

    /* Полуячаю Firstname и Lastname вошедшего пользователя, беру первые буквы и формирую иконку в правом верхнем углу экрана */
    const userInSystem = useSelector(state=>state.singInForm.userInSystem)
    let Firstname='';
    let Lastname ='';

    try {
        Firstname = userInSystem[0].Firstname
        Lastname = userInSystem[0].Lastname
    } catch{}
    // 

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
                        placeholder={props.placeholder}/>
                
            </div>
            {meta.touched && meta.error ? (
              <div className="error">{meta.error}</div>
            ) : null}
          </>
        )
    }


    
    return (
        <div className='wrapper'>
            <div className='headerApp__logo'></div>
            {/* eslint-disable-next-line */}
            <a className="headerApp__sellButton" href="#">Sell on Shopka</a> 
            {/* eslint-disable-next-line */}
            <a className="headerApp__register" href="#" >Register</a>
            <Formik
            initialValues={{name:""}}
            onSubmit={(values) => dispatch(formSearch(values))}>
                {({resetForm})=>(
                <Form>
                    <div className='headerApp__inputLine'>
                        <button type="submit" className='headerApp__search'></button>
                        <MyTextField name="name" classNameInput="headerApp__input" type="text" placeholder='mens clothing jewelery electrical all'></MyTextField>
                        <button type="button" className='headerApp__clear' onClick={()=> {resetForm()}}></button>
                    </div>
                </Form>
                    )}
            </Formik>
                <div className='headerApp__consumer'>Consumer Electronics</div>
                <Link exact to="/singIn" >
                    <button className='headerApp__signIn'>Sign in</button>
                </Link>
                <div className='headerApp__myCart'>
                <Link to='/MyBasket'>
                  <button className='headerApp__button'>My cart</button>
                </Link>
                    {/* Следующая строчка выводит количество товаров в корзине пользователя  */}
                    {productsInBasket.length !== 0 ? <div className='headerApp__myCart active'>{productsInBasket.length}</div> : null} 
                </div>
                {Firstname ? <InitialPopover Firstname={Firstname} Lastname ={Lastname}/> : 
                <div style={{'width': '41px', 'height': '41px', 'borderRadius':'50%', 'border':'solid blue 1px'}}></div>}
                {<Example/>} {/* Модальное окно оповещения о выходе из системы */}
        </div>
       
    )
};

/* Элемент Popover появляется в правом верхнем углу при успешном входе пользователя. Также 
формируеися кнопка выход из аккаунта*/
const InitialPopover = (props) => {
    const dispatch = useDispatch();
    const {productsInBasket} = useSelector(state=>state.basketSlice); /* Необходим записи выбранных товаров в db.json */

    const userInSystem = useSelector(state=>state.singInForm.userInSystem)
    let Email = userInSystem[0].email; /* Необходим для записи в базу данных выбранных продуктов с привязкой к почте */
    let emailAndProducts = {Email, productsInBasket}  /* Содержит информацию об эл.адресе пользователя и выбранных им продуктах,
    которая при выходе из аккаунта записывается в db.json в функции userExit() */

    /* Функция записывает в state userInSystem пустой массив тем самым выходит из системы, а также 
    перезаписывает в db.json выходящего из аккаунта пользователя со всеми его товарами, чтобы при 
    следующем его входе в корзину уже подгрузились товары, которые он выбрал ранее.*/
    const userExit = () => {
      dispatch(getAutorisation(false))
      dispatch(getEmailAndProducts()) /* Получаю всех пользователей и их товары, хранящиеся в базе данных */
        .then(resolve => { 
          /* Далее ищу в полученном списке пользователя которы сейчас выходит из аккаунта и если он там есть
          удаляю его из базы, что бы следующим действием записать снова, но уже с новыми товарами */
            try {
              for(let i=0; i <= resolve.payload.length; i++) {
              
                let index = resolve.payload.filter(item => item.Email === Email)
                dispatch(delEmailAndProducts(index[0].id)) /* Удаляю выходящего из аккаунта пользователя и его продукты из db.json. Удаление 
                                                            происходит по id элемента */
              }} catch {}

            dispatch(setEmailAndProducts(emailAndProducts)) /* Записываю эл.адрес и товары в db.json */
             
      })
      .finally (
        dispatch(userIdentification([])),
        dispatch(setEmptyBasket([])),
        dispatch(setSmShow(true))
      )
    }

    const popover = usePopoverState();
    const {Firstname, Lastname} = props;
    return (
      <>
        <PopoverDisclosure {...popover} className='headerApp__initals' style={Firstname ? {'backgroundColor': 'rgb(207, 201, 201)'} : null}>{Firstname.slice(0,1) + Lastname.slice(0,1)}</PopoverDisclosure>
        <Link to='/'>
          <Popover {...popover} className='headerApp__exit' aria-label="Exit" onClick={()=>userExit()}>
            Выход
          </Popover>
        </Link>
      </>
    );
  }

  /* Модальное окно оповещения о выходе из системы */
 const Example = () => {
    const dispatch = useDispatch();
    const {smShow} = useSelector(state=> state.singInForm);

    return (
      <>
        <Link to='/'>
          <Modal
            size="sm"
            show={smShow}
            onHide={() => dispatch(setSmShow(false))}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Вы вышли
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>Возвращайтесь...</Modal.Body>
          </Modal>
        </Link>
      </>
    );
  }

export default HeaderApp;
