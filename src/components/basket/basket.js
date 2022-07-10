import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal, Card, Button } from "react-bootstrap";
import {getAutorisation, renderCards, removeProductInBasket } from '../basket/basketSlice';
import { Link } from "react-router-dom";
import '../centerRight/centerRight.scss';




const Basket =() => {
    const {productsInBasket} = useSelector(state=> state.basketSlice)
    const {autorisation} = useSelector(state=> state.basketSlice)
    const {userInSystem} =useSelector(state=>state.singInForm)
    const dispatch = useDispatch()


    /* При нажатии кнопки My cart проверяет авторизировался ли пользователь. 
    Если нет выводится модальное окно с сообщением о необходимости авторизации  */
    useEffect(()=>{
        if(userInSystem.length === 0) {
            dispatch(getAutorisation("noAutorisation"));
        } else {
          if(productsInBasket.length === 0) {
            dispatch(getAutorisation("emptyBasket"));
          } else {
            dispatch(renderCards(true)) /* Рендерю карточки товароы из productsInBasket */
          }
        }
        // eslint-disable-next-line
    },[productsInBasket])
    
    return (
        <>
        {<RenderCards/>}
        { autorisation ? <Notification/> : null}
        </>
    )
}

  /* Модальное окно оповещения о следующих событиях:
  1) пользователь не авторизировался. Срабатывает при нажати на кнопку My cart 
  2) о том что корзина пуста */
  const Notification = () => {
    const dispatch = useDispatch();
    const {autorisation} = useSelector(state=> state.basketSlice);

    const message = {
      title: "",
      message: ""
    }

    switch (autorisation) {
      case 'noAutorisation': 
        message.title = "Похоже вы не авторизировались";
        message.message = "Авторизируйтесь и попробуйте еще раз";
      break;
      case "emptyBasket": 
        message.title = "Ваша корзина пуста";
        message.message = "Выбирите один из продуктов";
        break;
      default: break;
    }

    return (
      <>
       <Link to='/'>
        <Modal
            size="sm"
            show={autorisation}
            onHide={() => dispatch(getAutorisation(false))}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                {message.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{message.message}</Modal.Body>
          </Modal>
       </Link>
      </>
    );
  }

  /* Компонент рендерит карточки товаров из корзины пользователя. */
  const RenderCards =() => { 
    const {productsInBasket} = useSelector(state=> state.basketSlice)
    const dispatch = useDispatch()
    const {renderCardsNow} = useSelector(state=> state.basketSlice)

    /* Функция удаления товара из productsInBasket в basketSlice. Использую метод map*/
    const removeCard =(id)=> {
      dispatch(removeProductInBasket(id))
    }

    if(renderCardsNow) {
      return productsInBasket.map(({id, title, description, image, price}) => {
        return <div className="centerRightBasket__card">
          <Card key={id}>
                  <Card.Img variant="top" src={image} />
                  <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                      {description}
                    </Card.Text>
                    <Card.Text>
                      {price + '$'}
                    </Card.Text>
                    <Button onClick={()=>removeCard(id)} variant="primary">Удалить</Button>
                  </Card.Body>
              </Card>
        </div>
      
      })
    }
  

}

export default Basket;