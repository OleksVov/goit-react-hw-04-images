import React, {useState, useEffect} from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Searchbar} from "./Searchbar/Searchbar";
import {ImageGallery} from "./ImageGallery/ImageGallery";
import { toast } from 'react-toastify';
import {Button} from "./Button/Button"
import { Loader } from "./Loader/Loader";
import axios from "axios";
import PropTypes from 'prop-types';

const apiKey = '34240691-69b0febad4566a0b07df5e473';

export const App =() => {

  const[searchImages, setSearchImages] = useState('');
  const[images, setImages] = useState([]);
  const[loading, setLoading] = useState(false);
  const[loadMoreImages, setLoadMoreImages] = useState(false);
  const[ page, setPage] = useState(1);
  
 


const handleFormSubmit = searchImages => {
  setSearchImages(searchImages);
  setPage(1);
  setImages([]);
}
 
const handleLoadMoreImages=() => {
  setPage(prevState => prevState + 1)
};

useEffect(() => {

  if(searchImages) {

    setLoading(true);

    const fetch = async() => {
      const response = await axios.get(`https://pixabay.com/api/?q=${searchImages}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`);

     

      setImages(prevState => 
              [...prevState, ...response.data.hits]);

      setLoadMoreImages(true)
  
  if (response.data.total === 0) {
      toast.warn('We did not find the images you requested');
      setLoadMoreImages(false)
              }
      
  if (response.data.hits.length < 12 && response.data.hits.length > 0) {
      toast.info('we have found all the pictures according to your request');
      setLoadMoreImages(false)
              }           
              setLoading(false);
    }
    fetch();
  }
},[searchImages, page])



    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        <Searchbar onSubmit={handleFormSubmit}/>
        <ToastContainer autoClose={3000}/>
        {loading&& <Loader/>}
        <ImageGallery images={images}/>
        {loadMoreImages && <Button onClick={handleLoadMoreImages}/>}
      </div>
    );
  
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired
}