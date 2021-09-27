import './Header.css';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { useState } from 'react';


const Header = ({loggedIn}) => {
	const [burgerMenuActive, setBurgerMenuActive] = useState(false);

   return (
		<>
			{!loggedIn ?
				<header className="header header__background-color">
					<NavLink to='/' className="header__logo">
						<img src={logo} alt='Логотип'></img>
					</NavLink>
					<div className="header__container">
						<nav className="header__authorization">
							<NavLink to='signup' className="header__signup">Регистрация</NavLink>
							<NavLink to='signin' className="header__signin">Войти</NavLink>
						</nav>
					</div>
				</header> :

				<header className="header ">
					<div className="header__container ">
						<NavLink to='/' className="header__logo">
							<img src={logo} alt='Логотип'></img>
						</NavLink>
					</div>
					<div className="header__container ">
						<div className="header__nav">
							<NavLink 
								to='/movies' 
								className='header__nav-link'
								activeClassName="header__nav-link-active"
							>
								Фильмы
							</NavLink>
							<NavLink
								to='/saved-movies'
								className='header__nav-link'
								activeClassName='header__nav-link-active'
							>
								Сохранённые фильмы
							</NavLink>
						</div>
						<div className="header__account">
							<NavLink to="/profile" className="header__account-name">Аккаунт</NavLink>
						</div>
					</div>
					<button type="button" className="header__burger-menu" onClick={() => setBurgerMenuActive(!burgerMenuActive)}></button>
					<BurgerMenu active={burgerMenuActive} setActive={setBurgerMenuActive} />
				</header>
			}
		</>
   )
}

export default Header;