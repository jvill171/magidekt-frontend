
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./Overlay.scss"


const Overlay = ({isOpen, onClose, children}) =>{
    return(
      <>
        {isOpen && (
          <div className="overlay">
            <div className="overlay__background" />
            <div className="overlay__container">
              <div className="overlay__controls__container">
                <div className="overlay__controls">
                  <button
                    className="overlay__close"
                    onClick={onClose}
                  > 
                    <FontAwesomeIcon icon={faArrowLeft} className="back_arrow"/>
                  </button>
                </div>
              </div>
              {children}
            </div>
          </div>
        )}
      </>
    )
}

export default Overlay;