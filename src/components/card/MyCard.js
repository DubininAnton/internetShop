import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSingleCard } from "../centerRight/centerRightSlice";
import  Spinner   from '../spinner/spinner';
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { showModal } from '../singInForm/singInFormSlice';
import {setProductsInBasket} from '../basket/basketSlice';
import './myCard.scss';


const MyCard = () => {
const {id} = useParams(); /* Использую для того чтобы вытащить передаваемй в Link
                            параметр в данном случае id по котору получаем инфу на данный товар с сервера */
const dispatch = useDispatch();
const {singleCard} = useSelector(state=>state.cards)
const {statusLoadingCard} = useSelector(state => state.cards)
const {userInSystem} = useSelector(state=>state.singInForm)
const {showModalAboutRegistration} = useSelector(state=> state.singInForm);
// const {productsInBasket} =useSelector(state => state.basketSlice);

useEffect(()=> {
    dispatch(getSingleCard(id))
},[id, dispatch])


const {title, description,image, price} = singleCard;

/* Функция записи выбранного продукта в state productsInBasket в basketSlice */
const setProductInBasket = (id)=> {
    if(userInSystem.length === 0 ) {
        dispatch(showModal(true))
    } else {
        dispatch(setProductsInBasket(singleCard)) /* Записываю выбранный товар в state productsInBasket в basketSlice */
        // console.log(productsInBasket)
    }
}

    return (
        <>
        {statusLoadingCard ? <Spinner/> : <Card style={{ width: '50%' }}>
                                            <Card.Img variant="top" src={image} />
                                            <Card.Body>
                                                <Card.Title>{title}</Card.Title>
                                                <Card.Text>
                                                    {description}
                                                </Card.Text>
                                                <Card.Text className="price">
                                                    {price + "$"}
                                                </Card.Text>
                                                <div className="wrapper">
                                                    <Button onClick={()=>setProductInBasket(singleCard)} variant="primary">В корзину</Button>
                                                    <Link to ='/'>
                                                        <Button variant="primary">Выйти</Button>
                                                    </Link>
                                                </div>
                                            </Card.Body>
                                        </Card>}
        {showModalAboutRegistration ? <SmallModal/> : null}
        </>
    )
        
    
}

  /* Модальное окно оповещения о том что перед тем как что-то положить в корзину необходимо зарегестрироваться или 
  войти в свой аккаунт */
  const SmallModal = () => {
    const dispatch = useDispatch();
    const {showModalAboutRegistration} = useSelector(state=> state.singInForm);

    return (
      <>
        <Modal
          size="sm"
          show={showModalAboutRegistration}
          onHide={() => dispatch(showModal(false))}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Вы не вошли в аккаунт
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>Пожалуйста, зарегестрируйтесь или войдите в свой аккаунт</Modal.Body>
        </Modal>
      </>
    );
  }

export default MyCard;