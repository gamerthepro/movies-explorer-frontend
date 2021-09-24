import './MoviesCard.css';

const MoviesCard = ({ movie, isFavorite, onBookmarks, bookmarksStatus }) => {
	const isBookmark = bookmarksStatus(movie);

	const movieBtnClassName = isBookmark ? isFavorite ? 'movies-card__button movies-card__button_type_delete' : 'movies-card__button movies-card__button_type_saved' : 'movies-card__button movies-card__button_type_save';

	const duration = `${ Math.floor(movie.duration / 60) } час ${ movie.duration % 60 } минут`;

	const handleBookmarkClick = () => {
		onBookmarks(movie, isBookmark);
	}

	return (
		<div className="movies-card">
			<div className="movies-card__info">
			<p className="movies-card__title">{ movie.nameRU }</p>
			<p className="movies-card__time">{ duration }</p>
			</div>
			<a href={ movie.trailer } target="_blank" rel="noopener noreferrer">
			<img className="movies-card__image" src={ movie.image } alt={ movie.nameRU }/>
			</a>
			<button type="button" className={ movieBtnClassName } onClick={ handleBookmarkClick }/>
		</div>
	)
}

export default MoviesCard;
