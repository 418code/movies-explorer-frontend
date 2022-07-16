import successIcon from '../../images/success_icon.svg';
import failureIcon from '../../images/failure_icon.svg';

export default function Popup(props) {
  return (
    <div className={`Popup Popup_transparent_medium ${props.open ? 'Popup_opened' : ''}`}>
        <div className="Popup__container Popup__container_type_fixed-size-adaptive">
          <button className="Popup__container-close-btn transparent transparent_amount_more"
            type="button" aria-label="Кнопка закрытия попапа"
            onClick={props.onClose}></button>
          <img src={props.successful ? successIcon : failureIcon} className="Popup__confirm-icon" alt="иконка попапа" />
          <p className="Popup__confirm-text">{props.message}</p>
        </div>
    </div>
  );
}
