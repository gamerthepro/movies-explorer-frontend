import './SearchForm.css';
import { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    setKeyword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  }

  return (
    <section className='search-form'>
      <form className='search-form__container' onSubmit={ handleSubmit }>
        <div className='search-form__field'>
          <input type="search"
                 onChange={ handleChange }
                 className="search-form__search"
                 placeholder="Фильм" />
          <div onClick={ handleSubmit } className='search-form__field-image'/>
        </div>
      </form>
    </section>
  )
}

export default SearchForm;
