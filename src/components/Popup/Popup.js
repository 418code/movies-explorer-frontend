import successIcon from '../../images/success_icon.svg';
import failureIcon from '../../images/failure_icon.svg';

export default function Popup({popupContent, isPopupOpened, onClose}) {
  return (
    <div className={`Popup Popup_transparent_medium ${isPopupOpened ? 'Popup_opened' : ''}`}>
        <div className="Popup__container Popup__container_type_fixed-size-adaptive">
          <button className="Popup__container-close-btn transparent transparent_amount_more"
          <img key="successIcon" src={popupContent.success ? successIcon : failureIcon}
          <p key="confirmText" className="Popup__confirm-text">{popupContent.message}</p>
        </div>
    </div>
  );
}
