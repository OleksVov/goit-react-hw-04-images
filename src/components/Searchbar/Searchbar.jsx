import React, {useState} from "react";
import { toast } from 'react-toastify';
import css from './Searchbar.module.css'


export const Searchbar = ({onSubmit}) =>  {

const[searchImages, setSearchImages] = useState('')

const handleImagesChange = event => {
    setSearchImages(event.currentTarget.value)
}

const handleSubmit = event => {
    event.preventDefault();
    if(searchImages.trim() === '') {
        toast.info('Enter search term', {
            theme:'colored',
        });
        return;
    }
onSubmit(searchImages);
    setSearchImages('');
}

   

        return (
            <header className={css.searchbar}>
  <form  onSubmit={handleSubmit} className={css.form}>
    <button type="submit" className={css.button}>
      <span className={css.buttonLabel}>Search</span>
    </button>

    <input
      className={css.input}
      type="text"
      name="searchImages"
      value={searchImages}
      onChange={handleImagesChange}
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header>
        )
    }


