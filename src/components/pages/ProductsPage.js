import HeaderApp from "../headerApp/headerApp";
import CollapsMenu from "../collapsMenu/collapsMenu";
import UnderHeaderApp from "../underHeaderApp/underHeaderApp";
import MyCard  from "../card/MyCard";

export const ProductsPage = () => {
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
                    <MyCard/>
                </div>
            </div>
        </>
    )
}