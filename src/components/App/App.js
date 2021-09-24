import { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router";
import './App.css';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import auth from "../../utils/Auth";
import moviesApi from "../../utils/MoviesApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/currentUserContext";
import {SHORT_MOVIE_TIME_LIMIT} from '../../utils/constants';

function App() {
	const [currentUser, setCurrentUser] = useState({
		name: "",
		email: "",
	});

	const [loggedIn, setLoggedIn] = useState(false);

	const [allMovies, setAllMovies] = useState([]); // все фильмы (M)
	const [savedMovies, setSavedMovies] = useState([]) // все сохраненные фильмы (SM)

	const [searchedMovies, setSearchedMovies] = useState([]) // фильмы из поиска (M)
	const [searchedSavedMovies, setSearchedSavedMovies] = useState([]) // сохраненные фильмы из поиска (SM)

	const [isShortMovies, setIsShortMovies] = useState(false) // короткие (M)
	const [isShortSavedMovies, setIsShortSavedMovies] = useState(false) // короткие (SM)

	const [isLoading, setIsLoading] = useState(false);
	const [searchResponse, setSearchResponse] = useState(true);
	const [savedSearchResponse, setSavedSearchResponse] = useState("");
	const [errorResponse, setErrorResponse] = useState('')

	const history = useHistory();
	const location = useLocation().pathname;

	//проверяем токен
	const tokenCheck = () => {
		const token = localStorage.getItem('jwt');
		if (token) {
			auth.getContent(token)
			.then((res) => {
				if (res) {
					setCurrentUser(res);
				}
				setLoggedIn(true);
				history.push(location);
			})
		}
	}

	const handleLogin = (email, password) => {
		setIsLoading(true);
		auth.signin(password, email)
			.then((res) => {
			if (res) {
				setTimeout(() => {
					setIsLoading(false);
					setLoggedIn(true);
					setCurrentUser(res.data);

					localStorage.setItem('jwt', res.token);
					history.push('/movies');
				}, 500)
			}
			})
			.catch((err) => {
			setIsLoading(false);
			if (err === "Ошибка 400") {
				return setErrorResponse("Не верно заполнено одно из полей");
			}
			if (err === "Ошибка 401") {
				return setErrorResponse("Неправильные почта или пароль");
			}
			if (err === "Ошибка 500") {
				return setErrorResponse("Что-то пошло не так. Попробуйте позже");
			}
			console.log(err);
			});
	}

	const handleRegister = (email, password, name) => {
		setIsLoading(true);
		auth.signup(password, email, name)
			.then((res) => {
			if (res) {
				setTimeout(() => {
					setIsLoading(false);
					handleLogin(email, password);
				}, 500)
			}
			})
			.catch((err) => {
			setIsLoading(false);
			if (err === "Ошибка 400") {
				return setErrorResponse("Не верно заполнено одно из полей");
			}
			if (err === "Ошибка 409") {
				return setErrorResponse("Пользователь с таким имейлом уже существует");
			}
			if (err === "Ошибка 500") {
				return setErrorResponse("Что-то пошло не так. Попробуйте позже");
			}
			console.log(err);
			});
	}

	const handleUpdateUser = (name, email) => {
		setIsLoading(true);
		mainApi.setUserInfo(name, email)
			.then((res) => {
			if (res) {
				setTimeout(() => {
					setIsLoading(false);
					setCurrentUser({
					...currentUser,
					name: res.name,
					email: res.email,
					});
				}, 500)
			}
			})
			.catch((err) => {
			setIsLoading(false);
			if (err === "Ошибка 500") {
				return setErrorResponse("Что-то пошло не так. Попробуйте позже");
			}
			console.log(err);
			});
	}

	const handleLogout = () => {
		localStorage.removeItem('jwt');
		setLoggedIn(false);
		history.push('/');
	}

	// Проверяем токен
	useEffect(() => {
		tokenCheck();
	}, []);

	// Загружаем фильмы, сохраняем локально
	useEffect(() => {
		if (localStorage.getItem("allMovies")) {
			const movies = JSON.parse(localStorage.getItem("allMovies"))
			setAllMovies(movies);
			setSearchedMovies(movies)
		} else {
			moviesApi
			.getFilms()
			.then((res) => {
				const movies = res.map((item) => {
					return {
					country: item.country,
					director: item.director,
					duration: item.duration,
					year: item.year,
					description: item.description,
					image: `https://api.nomoreparties.co${ item.image.url }`,
					trailer: item.trailerLink,
					thumbnail: `https://api.nomoreparties.co${ item.image.formats.thumbnail.url }`,
					movieId: item.id,
					nameRU: item.nameRU,
					nameEN: item.nameEN,
					};
				});

				localStorage.setItem("allMovies", JSON.stringify(movies));
				setAllMovies(movies);
				setSearchedMovies(movies)
			})
			.catch((err) => {
				setSearchResponse("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер " +
					"недоступен. Подождите немного и попробуйте ещё раз");
				console.log(err)
			});
		}
		getSavedMovies();

		if (localStorage.getItem("savedMovies")) {
			const movies = JSON.parse(localStorage.getItem("savedMovies"))
			setSavedMovies(movies);
			setSearchedSavedMovies(movies);
		} else {
			getSavedMovies();
		}
	}, []);

	const getSavedMovies = () => {
		mainApi.getMovies()
			.then((res) => {
			localStorage.setItem("savedMovies", JSON.stringify(res));
			setSavedMovies(res);
			setSearchedSavedMovies(res)
			})
			.catch((err) => {
			setSavedSearchResponse("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер " +
				"недоступен. Подождите немного и попробуйте ещё раз");
			console.log(err)
			});
	}

	const addMovie = (movie) => {
		mainApi.createMovie(
			movie.country,
			movie.director,
			movie.duration,
			movie.year,
			movie.description,
			movie.image,
			movie.trailer,
			movie.thumbnail,
			movie.nameRU,
			movie.nameEN,
			movie.movieId)
			.then((res) => {
			getSavedMovies()
			})
			.catch((err) => console.log(err));
	}

	const removeMovies = (movie) => {
		const movieId = savedMovies.find(item => item.movieId === movie.movieId)._id;

		mainApi.deleteMovie(movieId)
			.then((res) => {
			getSavedMovies()
			})
			.catch((err) => console.log(err))
	}

	const handleCheckShortMovies = (checked) => {
		setIsLoading(true);
		setSearchResponse(true)
		setIsShortMovies(checked);

		setTimeout(() => {
			setIsLoading(false);
			checked ? setSearchedMovies(filterShortMovies(allMovies)) : setSearchedMovies(allMovies)
		}, 400);
	}

	const handleCheckShortSavedMovies = (checked) => {
		setIsLoading(true);
		setSearchResponse(true)
		setIsShortSavedMovies(checked);

		setTimeout(() => {
			setIsLoading(false);
			checked ? setSearchedSavedMovies(filterShortMovies(savedMovies)) : setSearchedSavedMovies(savedMovies)
		}, 400);
	}

	const filterShortMovies = (movies) => {
		return movies.filter(movie => movie.duration <= SHORT_MOVIE_TIME_LIMIT)
	}

	const searchMovies = (arr, keyword) => {
		const movies = arr.filter(item => {
			return (item.nameRU && item.nameRU.toLowerCase().includes(keyword.toLowerCase())) ||
			(item.nameEN && item.nameEN.toLowerCase().includes(keyword.toLowerCase())) ||
			(item.description && item.description.toLowerCase().includes(keyword.toLowerCase()))
		});

		(movies.length === 0) ? setSearchResponse(false) : setSearchResponse(true)

		return movies;
	}

	const handleSearch = (keyword) => {
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);

			const filterMovies = isShortMovies ? filterShortMovies(allMovies) : allMovies

			if (keyword) {
			const movies = searchMovies(filterMovies, keyword);

			setSearchedMovies(movies)

			} else {
			setSearchResponse(true)
			setSearchedMovies(filterMovies)
			}
		}, 400)
	}

	const handleSavedSearch = (keyword) => {
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);

			const filterMovies = isShortMovies ? filterShortMovies(savedMovies) : savedMovies

			if (keyword) {
			const movies = searchMovies(filterMovies, keyword);
			setSearchedSavedMovies(movies)
			} else {
			setSearchResponse(true)
			setSearchedSavedMovies(filterMovies)
			}
		}, 400)
	}

	const handleBookmarks = (movie, isBookmarks) => {
		!isBookmarks ? addMovie(movie) : removeMovies(movie);
	}

	const handleBookmarksStatus = (movie) => {
		return savedMovies.some(savedMovie => savedMovie.movieId === movie.movieId);
	}

	const isRenderGlobalComponents = () => {
		return location === "/movies" || location === "/saved-movies" || location === "/" || location === "/profile";
	}

	return (
		<CurrentUserContext.Provider value={ currentUser }>
			<div className="page">
			{ isRenderGlobalComponents() === true && <Header
				loggedIn={ loggedIn }
			/> }
			<Switch>
				<Route exact path="/">
					<Main/>
				</Route>

				<ProtectedRoute
					path="/movies"
					onSearch={ handleSearch }
					searchResponse={ searchResponse }
					isShortChecked={ isShortMovies }
					onShortChange={ handleCheckShortMovies }
					onBookmarks={ handleBookmarks }
					bookmarksStatus={ handleBookmarksStatus }
					isLoading={ isLoading }
					loggedIn={ loggedIn }
					component={ Movies }
					movies={ searchedMovies }
				/>

				<ProtectedRoute
					path="/saved-movies"
					onSearch={ handleSavedSearch }
					searchResponse={ searchResponse }
					isShortSavedMovies={ isShortSavedMovies }
					onShortChange={ handleCheckShortSavedMovies }
					onBookmarks={ handleBookmarks }
					bookmarksStatus={ handleBookmarksStatus }
					loggedIn={ loggedIn }
					isLoading={ isLoading }
					component={ SavedMovies }
					movies={ searchedSavedMovies }
				/>

				<ProtectedRoute
					path="/profile"
					loggedIn={ loggedIn }
					onEditProfile={ handleUpdateUser }
					onLogout={ handleLogout }
					component={ Profile }
					isLoading={ isLoading }
					errorResponse={ errorResponse }
				/>

				<Route path="/signup">
					<Register onRegister={ handleRegister }
								isLoading={ isLoading }
								errorResponse={ errorResponse }
					/>
				</Route>

				<Route path="/signin">
					<Login onLogin={ handleLogin }
							isLoading={ isLoading }
							errorResponse={ errorResponse }
					/>
				</Route>

				<Route path="*">
					<NotFound/>
				</Route>

			</Switch>
			{ isRenderGlobalComponents() === true && <Footer/> }
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
