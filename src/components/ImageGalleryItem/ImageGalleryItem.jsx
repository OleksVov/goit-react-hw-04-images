import React, {useState} from "react";
import css from './ImageGalleryItem.module.css'
import {Modal} from "components/Modal/Modal";
import PropTypes from 'prop-types';


export const ImageGalleryItem = ({webformatURL, largeImageURL, tag}) => {

  const[showModal, setShowModal] = useState(false)
   

    const toggleModal = () => {
        setShowModal(!showModal)
    }
   
  //  render() {

  //   const {webformatURL,largeImageURL, tag} = this.props;
  //   const {showModal} = this.state;
    return (
        <>
          <li 
          className={css.imageGalleryItem}
          >
    <img className={css.image} src={webformatURL} alt={tag} onClick={toggleModal} />
  </li>

  {showModal && (<Modal onCloseModal={toggleModal}>
    <img src={largeImageURL} alt={tag} />
  </Modal>)}
  
  </>
      )
   }


Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};