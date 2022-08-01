import { useIntl } from "react-intl";
import successIcon from "../../images/success_icon.svg";
import failureIcon from "../../images/failure_icon.svg";

export default function Popup({ popupContent, isPopupOpened, onClose }) {
  const intl = useIntl();

  return (
    <div
      className={`Popup Popup_transparent_medium ${
        isPopupOpened ? "Popup_opened" : ""
      }`}
    >
      <div className="Popup__container Popup__container_type_fixed-size-adaptive">
        <button
          className="Popup__container-close-btn transparent transparent_amount_more"
          type="button"
          aria-label={intl.formatMessage({
            id: "popup_close_btn",
            defaultMessage: "Кнопка закрытия попапа",
          })}
          onClick={onClose}
        ></button>
        <img
          key="successIcon"
          src={popupContent.success ? successIcon : failureIcon}
          className="Popup__confirm-icon"
          alt={intl.formatMessage({
            id: "popup_icon",
            defaultMessage: "иконка попапа",
          })}
        />
        <p key="confirmText" className="Popup__confirm-text">
          {popupContent.message}
        </p>
      </div>
    </div>
  );
}
