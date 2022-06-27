export default function Preloader(props) {
    return (
        <section className={`Preloader ${props.visible ? 'Preloader_visible' : ''}`}>
            <div className="Preloader__container">
                <span className="Preloader__round"></span>
            </div>
        </section>
    )
};
