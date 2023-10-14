import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { SHOW_ROOM } from '../apollo/rooms';

const ShowRoom = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(SHOW_ROOM, { variables: { roomId: id } });

  if (error) {
    return (
      <div className="bg-dark text-light min-vh-100 py-5">
        <div className="container">
          <Link to={`/`} className="fs-2 text-light btn btn-success w-25 mb-5">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>

          <div className="d-flex align-items-center justify-content-center flex-column gap-4 mb-5">
            <h2 className="text-center">Error: ${error.message}</h2>
          </div>
        </div>
      </div>
    );
  };

  return loading
    ? <div className="bg-dark text-light min-vh-100 d-flex align-items-center justify-content-center">
      <h1>Loading</h1>
    </div>
    : (
      <div className="bg-dark text-light py-5 min-vh-100">
        <div className="container">
          <Link to={`/`} className="fs-2 text-light btn btn-success w-25 mb-5">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          <div className="text-center my-5">
            <h1>
              Class name: <span className="text-danger">{data.room.name}</span>
            </h1>

            <p className="fs-2">
              Floor: <span className="text-warning">{data.room.floor}</span>
            </p>

            <p className="fs-2">
              Type: <span className="text-primary">{data.room.for_stuff ? "Stuff room" : "Class room"}</span>
            </p>
          </div>
        </div>
      </div>
    );
};

export default ShowRoom;