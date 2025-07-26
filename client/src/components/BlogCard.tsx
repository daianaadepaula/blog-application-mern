import axios from "axios";
import { Link } from "react-router";
import { slugify } from "../util/slugify";

const BlogCard = ({ data, refetch, onEditClick }) => {
  const deleteFun = async () => {
    await axios.delete(import.meta.env.VITE_API_URL + "/delete/" + data._id);
    refetch();
  };

  return (
    <div className="col-sm-12 mx-auto card my-3">
      <div className="card-header">
        <Link to={`/blog/${data._id}-${slugify(data.title)}`}>
          <h4 className="card-title">{data.title}</h4>
        </Link>
      </div>
      <div className="card-body">
        <p className="card-text">{data.description}</p>
      </div>
      <div className="card-footer">
        <button
          type="button"
          className="btn btn-primary btn-sm me-2"
          onClick={() => onEditClick(data)}
        >
          Editar
        </button>
        <button onClick={deleteFun} className="btn btn-danger btn-sm">
          Excluir
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
