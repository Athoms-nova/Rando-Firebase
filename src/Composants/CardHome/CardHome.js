import './CardHome.scss'

const CardHome = ({ image, title, onClick}) => {
    return (
      <div className="card-home">
        <button onClick={() => onClick(title)}>
          <img src={image} alt={title} />
          <h2> {title} </h2>
        </button>
      </div>
    );
  };

export default CardHome