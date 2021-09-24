import './Portfolio.css'
import arrow from '../../images/arrow.svg'

const Portfolio = () => {
   return (
      <section className='portfolio'>
         <h4 className='portfolio__title'>Портфолио</h4>
         <ul className='portfolio__item'>
            <li className='portfolio__item-element'>
					<a className='portfolio__item-text '
               href='https://github.com/gamerthepro/how-to-learn'>Статичный сайт</a>
            <img className='portfolio__item-img' alt='Стрелка' src={arrow} />
            </li>
            <li className='portfolio__item-element'>
               <a className='portfolio__item-text '
               href='https://github.com/gamerthepro/russian-travel'>Адаптивный сайт</a>
               <img className='portfolio__item-img' alt='Стрелка' src={arrow} />
            </li>
            <li className='portfolio__item-element'>
               <a className='portfolio__item-text'
               href='https://github.com/gamerthepro/react-mesto-api-full'>Одностраничное приложение</a>
               <img className='portfolio__item-img' alt='Стрелка' src={arrow} />
            </li>
         </ul>            
      </section>
   )
}

export default Portfolio;