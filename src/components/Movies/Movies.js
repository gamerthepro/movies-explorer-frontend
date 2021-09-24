import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './Movies.css'
import Preloader from "../Preloader/Preloader";


const Movies = ({
   movies,
   isLoading,
   onSearch,
   searchResponse,
   isShortChecked,
   onShortChange,
   onBookmarks,
   bookmarksStatus
	}) => {

	return (
		<section className='movies'>
			<SearchForm onSearch={ onSearch }/>
			<FilterCheckbox checked={ isShortChecked } onChange={ onShortChange }/>
			{ isLoading === true }
			{ isLoading === true && <Preloader/> }
			{ searchResponse ? null : (<p className="movie__response">Ничего не найдено</p>) }

			<MoviesCardList
			movies={ movies }
			onBookmarks={ onBookmarks }
			bookmarksStatus={ bookmarksStatus }
			/>
		</section>
	)
}

export default Movies;
