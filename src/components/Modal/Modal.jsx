import React, {useEffect} from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({onCloseModal, children}) => {

useEffect(() => {
    window.addEventListener('keydown',handleKeyDown )
},[]);


useEffect(() => {
   return () => {
    window.removeEventListener('keydown',handleKeyDown )
   };
},[])


const handleKeyDown = event => {
    if (event.code === 'Escape') {
        onCloseModal()
    }
};

 const handleBackdropClick = event => {
    if(event.currentTarget === event.target) {
        onCloseModal()
    }
 };

    
        return createPortal(
            <div className={css.overlay} onClick={handleBackdropClick}>
  <div className={css.modal}>
    {children}
  </div>
</div>,
modalRoot,
        )
    }



createPortal.propTypes = {
    children: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
}