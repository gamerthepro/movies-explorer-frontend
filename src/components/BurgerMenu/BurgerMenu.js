import React from "react";
import './BurgerMenu.css';
import { NavLink } from "react-router-dom";

const BurgerMenu = ({active, setActive}) => {
   return (
      <section className={active ? 'menu active' : 'menu'}>
			<div className='menu__cantainer'>
				<button className='menu__button' onClick={() => setActive(false)}></button>
				<ul className='menu__links'>
					<li className='menu__item'>
						<NavLink to='/' className='menu__link'>Главная</NavLink>
					</li>
					<li className='menu__item'>
						<NavLink to='/movies' className='menu__link'>Фильмы</NavLink>
					</li>
					<li className='menu__item'>
						<NavLink to='/saved-movies' className='menu__link'>Сохранённые фильмы</NavLink>
					</li>
				</ul>
				<div className='menu__account'>
					<NavLink to='/profile' className='menu__link'>Аккаунт</NavLink>
				</div>
			</div>
      </section>
   )
}

export default BurgerMenu;