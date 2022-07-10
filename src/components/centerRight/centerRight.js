"strict mode"
import './centerRight.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchedCard } from './centerRightSlice';
import { createSelector } from '@reduxjs/toolkit';
import { Transition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
// import { Spinner } from 'react-bootstrap';


import Spinner from '../spinner/spinner';

const CenterRight = () => {
    const statusLoadingCard = useSelector(state => state.cards.statusLoadingCard)

  // Transition
  const duration = 500;
  const defaultStyle = {
      transition: `all ${duration}ms ease-in-out`,
      opacity: 0,
    }
  const transitionStyles = {
      entering: { opacity : 0, transform:'translateX(-100px)'},
      entered:  { opacity: 1, transform:'translateX(0)'},
      exiting:  { opacity: 1, transform:'translateX(0)' },
      exited:  { opacity: 0, transform:'translateX(-100px)'},
  }
  // 

    const dispatch = useDispatch();

    const sortProductions = createSelector(
        (state) => state.filters.sortProduct,
        (state) => state.cards.cards,
        (sortProduct, cards) => {
            if(sortProduct === "all") {
                return cards;
            } else {
                return cards.filter(item => item.category === sortProduct)
            }
            
        }
    );

    const sortProductionsItem = useSelector(sortProductions);

    useEffect(()=>{
        dispatch(fetchedCard())
        // eslint-disable-next-line
    },[])

    const renderCard = (cards) => {
        const cardArr = cards;
        if (cardArr.length !==0) {
            return cardArr.map(({id, title, description, image, price}) => {
                return <div key={id} className='centerRight__card'>
                            <Link to={`/products/${id}`}>
                                <img alt={title} src={image} className='centerRight__img'></img>
                                <div className='centerRight__descr'>{description.slice(0,140)+"..."}</div>
                                <div className='centerRight__price'>{price + "$"}</div>
                            </Link>
                        </div>
            })
        } else {
            return <div className='centerRight__message'>Товаров данной группы не найдено</div>
        }
        
    }

    const card = renderCard(sortProductionsItem);

    // const spinner = loading ? <Spinner/> : null;
    return (
        <TransitionGroup appear>
            <Transition timeout={duration}>
                {state => (
                    <div style ={{
                        ...defaultStyle,
                        ...transitionStyles[state]}} 
                        className='centerRight'>
                        {statusLoadingCard ? <Spinner/> : card}  
                    </div>
                )}
            </Transition>
        </TransitionGroup>
    )   
}

export default CenterRight;