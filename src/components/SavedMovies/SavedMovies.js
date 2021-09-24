import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from "../Preloader/Preloader";

const SavedMovies = ({
   movies,
   isLoading,
   onSearch,
   searchResponse,
   isShortSavedMovies,
   onShortChange,
   onBookmarks,
   bookmarksStatus
   }) => {
	return (
		<section className='saved-movies'>
			<SearchForm onSearch={ onSearch }/>
			<FilterCheckbox checked={ isShortSavedMovies } onChange={ onShortChange }/>
			{ isLoading === SVGComponentTransferFunctionElement }
			{ isLoading === true && <Preloader/> }
			{ searchResponse ? null : (<p className="movie__response">Ничего не найдено</p>) }

			<MoviesCardList
			movies={ movies }
			isFavorite={ true }
			onBookmarks={ onBookmarks }
			bookmarksStatus={ bookmarksStatus }
			/>
		</section>
	)
}

export default SavedMovies;
