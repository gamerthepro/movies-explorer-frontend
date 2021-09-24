import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import {useEffect, useState} from "react";
import {
	TABLET_CARDS_SIZE,
	MOBILE_CARDS_SIZE,
	DESCTOP_CARDS_VALUE,
	SET_DESCTOP_CARDS_VALUE,
	TABLET_CARDS_VALUE,
	SET_TABLET_CARDS_VALUE,
	MOBILE_CARDS_VALUE,
	SET_MOBILE_CARDS_VALUE
	} 
from '../../utils/constants';


const MoviesCardList = ({movies, isFavorite, onBookmarks, bookmarksStatus}) => {
	const [extraPortion, setExtraPortion] = useState(3);
	const [currentCount, setCurrentCount] = useState(0);
	const [renderMovies, setRenderMovies] = useState([]);

	const getCountMovies = (windowSize) => {
		if (windowSize > TABLET_CARDS_SIZE) {
			return {
				start: DESCTOP_CARDS_VALUE,
				add: SET_DESCTOP_CARDS_VALUE
			};
			} else if (windowSize > MOBILE_CARDS_SIZE && windowSize <= TABLET_CARDS_SIZE) {
			return {
				start: TABLET_CARDS_VALUE,
				add: SET_TABLET_CARDS_VALUE
			};
			} else {
			return {
				start: MOBILE_CARDS_VALUE,
				add: SET_MOBILE_CARDS_VALUE
			};
		}
	}

	const renderExtraPortion = () => {
		const count = Math.min(movies.length, currentCount + extraPortion);
		const extraMovies = movies.slice(currentCount, count);
		setRenderMovies([...renderMovies, ...extraMovies]);
		setCurrentCount(count);
	}

	const handleResize = () => {
		const windowSize = window.innerWidth;
		const sizePortion = getCountMovies(windowSize);
		setExtraPortion(sizePortion.add);
	}

	useEffect(() => {
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		const windowSize = window.innerWidth;
		const sizePortion = getCountMovies(windowSize);
		setExtraPortion(sizePortion.add);

		const count = Math.min(movies.length, sizePortion.start);
		setRenderMovies(movies.slice(0, count));
		setCurrentCount(count);
	}, [movies]);

	const handleAddMovies = () => {
		renderExtraPortion();
	}
   return(
		<section className='movies-card-list'>
			<div className='movies-card-list__container'>
				{renderMovies.map((movie) => {
					return <MoviesCard
						key={movie.movieId}
						movie={movie}
						isFavorite={isFavorite}
						onBookmarks={onBookmarks}
						bookmarksStatus={bookmarksStatus}
					/>
				})}
			</div>

			{movies.length !== 0 && currentCount < movies.length && <button type="button" className="movies-card-list__button" onClick={handleAddMovies}>
				<p className="movies-card-list__button-text">Ещё</p>
			</button>}

		</section>
	)
}

export default MoviesCardList;
