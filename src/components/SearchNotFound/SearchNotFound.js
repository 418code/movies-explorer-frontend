import { useIntl } from "react-intl";

export default function SearchNotFound(props) {
  const intl = useIntl();

  return (
    <section
      className={`SearchNotFound ${
        props.visible ? "SearchNotFound_visible" : ""
      }`}
    >
      <p className="SearchNotFound__text">
        {intl.formatMessage({
          id: "nothing_found",
          defaultMessage: "Ничего не найдено",
        })}
      </p>
    </section>
  );
}
