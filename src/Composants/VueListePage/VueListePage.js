import Pagination from "react-bootstrap/Pagination";
import './VueListePage.scss'

const VueListePage = ({
    listeNumPage,
    OnClickPage,
    OnDeplacementPage,
    pageActuel,
  }) => {
    return (
      <Pagination className="liste-page">
        <Pagination.First onClick={() => OnDeplacementPage("debut", "divers")} />
        <Pagination.Prev
          onClick={() => OnDeplacementPage("precedent", "divers")}
        />
        {listeNumPage.map((page) =>
          pageActuel === page ? (
            <Pagination.Item
              active
              onClick={() => OnClickPage(page)}
              key={"page" + page}
            >
              {page}
            </Pagination.Item>
          ) : (
            <Pagination.Item
              onClick={() => OnClickPage(page)}
              key={"page" + page}
            >
              {page}
            </Pagination.Item>
          )
        )}
        <Pagination.Next onClick={() => OnDeplacementPage("suivant", "divers")} />
        <Pagination.Last onClick={() => OnDeplacementPage("fin", "divers")} />
      </Pagination>
    );
  };



  export default VueListePage