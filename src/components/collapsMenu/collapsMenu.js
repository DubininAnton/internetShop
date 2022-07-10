import Accordion from 'react-bootstrap/Accordion';
import './collapseMenu.scss';

const CollapsMenu = () => {
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Рекламирую сам себя</Accordion.Header>
                    <Accordion.Body>
                        <div className='accordion-items'>
                            <a href ='http://www.tagcreator.ru' target='_blank' rel="noreferrer">Верстка,</a>
                        </div> 
                        <div className='accordion-items'>
                            <a href ='http://www.tagcreator.ru' target='_blank' rel="noreferrer">оформление,</a>
                        </div>
                        <div className='accordion-items'>
                            <a href ='http://www.tagcreator.ru' target='_blank' rel="noreferrer">логика,</a>
                        </div>
                        <div className='accordion-items'>
                            <a href ='http://www.tagcreator.ru' target='_blank' rel="noreferrer">код</a>
                        </div>
                        <div className='accordion-items'>
                            <a href ='http://www.tagcreator.ru' target='_blank' rel="noreferrer">разработаны</a>
                        </div>
                        <div className='accordion-items'>
                            <a href ='http://www.tagcreator.ru' target='_blank' rel="noreferrer">и написаны</a>
                        </div>
                        <div className='accordion-items'>
                            <a href ='http://www.tagcreator.ru' target='_blank' rel="noreferrer">мной</a>
                        </div>
                    </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default CollapsMenu;