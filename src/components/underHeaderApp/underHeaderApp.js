import './underHeaderApp.scss';
import { useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { fetchedFilters, activedFilter} from './underHeaderAppSlice';
import { changedProducts } from './underHeaderAppSlice';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

const UnderHeaderApp = () => {
    const {filters} = useSelector(state => state.filters);
    const {activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchedFilters())
        // eslint-disable-next-line
    },[]);

        // В сортировке учавствуют только кнопки clothing, intertaiment and electrical!!!
    const renderBtn = (filters) => {
        return filters.map(({alt, width, element, height})=> {

            let btnClass = classNames({"active" : alt === activeFilter})

            return alt !== "" ? <li key={uuidv4()}>
                        <button type='button'
                            onClick={()=>{dispatch(activedFilter(alt)); dispatch(changedProducts(alt))}}
                            alt={alt} 
                            style={{width: `${width}`, height:`${height}`}} 
                            className={`list__img ${element} ${btnClass}`}></button> 
                    </li> : null
        })
    }

    const btn = renderBtn(filters)
    return (
        <ul className='container list'>
            {btn}
        </ul>
    )

}
export default UnderHeaderApp;