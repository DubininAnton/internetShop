import HeaderApp from "../headerApp/headerApp";
import CollapsMenu from "../collapsMenu/collapsMenu";
import UnderHeaderApp from "../underHeaderApp/underHeaderApp";
import CenterRight from "../centerRight/centerRight";

export const SinglePage =()=> {
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
                    <CenterRight/>
                </div>
            </div>
        </>
    )
};