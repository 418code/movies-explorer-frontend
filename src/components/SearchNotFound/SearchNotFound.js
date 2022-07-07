export default function SearchNotFound (props) {
  return (
    <section className={`SearchNotFound ${props.visible ? 'SearchNotFound_visible' : ''}`}>
      <p className="SearchNotFound__text">Ничего не найдено</p>
    </section>
  );
}
