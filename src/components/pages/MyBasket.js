import HeaderApp from "../headerApp/headerApp";
import CollapsMenu from "../collapsMenu/collapsMenu";
import UnderHeaderApp from "../underHeaderApp/underHeaderApp";
import Basket from "../basket/basket";
import '../centerRight/centerRight.scss'

export const MyBasket = () => {
    return (
        <>
         <header className="App-header">
                <HeaderApp/>
                </header>
                <UnderHeaderApp/>
                <div className='center container'>
                    <div className='center__left'>
                        <CollapsMenu/>
                    </div>
                    <div className='center__right'>
                        <div className="centerRightBasket">
                            <Basket/>
                        </div>
                    </div>
                </div>
        </>
    )
}