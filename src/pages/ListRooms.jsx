import { useLazyQuery, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { GET_ROOMS } from '../apollo/rooms';
import Pagination from 'react-bootstrap/Pagination';
import { useEffect, useState } from "react";

let limit = 5;

const ListRooms = () => {
  const [offset, setOffset] = useState(0);
  const [q, setQ] = useState(null);
  const [values, setValues] = useState({ q: "" });
  const [order, setOrder] = useState("ASC");

  const [getRooms, { loading, error, data }] = useLazyQuery(GET_ROOMS);

  useEffect(() => {
    getRooms({
      variables: {
        "input": {
          "q": q,
          "page": {
            "limit": limit,
            "offset": offset * limit
          },
          "sort": {
            "by": "name",
            "order": order
          }
        }
      }
    });
  }, [offset, q, order]);

  function handleInpChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  };

  function submitForm(e) {
    e.preventDefault();
    setQ(values.q);
    setValues('');
  };

  function sortASC(e) {
    e.preventDefault();
    setOrder("ASC");
  };

  function sortDESC(e) {
    e.preventDefault();
    setOrder("DESC");
  };

  if (error) {
    return (
      <div className="bg-dark text-light min-vh-100 py-5">
        <div className="container">
          <Link to={`/rooms`} className="fs-2 text-light btn btn-success w-25 mb-5">
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
      <div className="bg-dark min-vh-100 text-light py-5">
        <div className="container">
          <div className="d-flex align-items-center justify-content-center flex-column gap-4 mb-5">
            <h1 className="text-center">LIST ROOMS</h1>

            <div className="d-flex gap-5">
              <Link className="btn btn-secondary" to={`/rooms/create`}>Add room</Link>

              <button onClick={sortASC} className="btn btn-secondary">
                <i className="fa-solid fa-arrow-down-short-wide"></i>
              </button>

              <button onClick={sortDESC} className="btn btn-secondary">
                <i className="fa-solid fa-arrow-up-short-wide"></i>
              </button>
            </div>


            <form onSubmit={submitForm} className=" d-flex gap-3 input-group mb-3 w-50">
              <input
                className="form-control"
                aria-label="Recipient's username" aria-describedby="basic-addon2"
                type="text"
                name='q'
                id='q'
                placeholder='Write room name'
                value={values.title}
                onChange={handleInpChange}
              />
            </form>
          </div>

          <ul className="list-unstyled d-flex flex-column align-items-center  gap-5">
            {
              data?.roomsList.list.length > 0 ?
              data?.roomsList.list.map((room) => (
                <li key={room.id} className="w-75">
                  <Card>
                    <Card.Header as="h2" className="text-center">{room.name}</Card.Header>
                    <Card.Body className="d-flex justify-content-between align-items-center px-5">
                      <Card.Title>Floor: {room.floor}</Card.Title>
                      <div className="d-flex gap-3">
                        <Link to={`/rooms/${room.id}`} className="btn btn-primary"><i className="fa-solid fa-eye"></i></Link>
                        <Link to={`/rooms/edit/${room.id}`} state={{ name: room.name, floor: room.floor, for_stuff: room.for_stuff }} className="btn btn-success"><i className="fa-solid fa-pen-to-square"></i></Link>
                        <Link to={`/rooms/delete/${room.id}`} className="btn btn-danger"><i className="fa-solid fa-trash"></i></Link>
                      </div>
                    </Card.Body>
                  </Card>
                </li>
              )) :
              <div className="text-light">
                <h2>Xonalar qolmadi</h2>
              </div>
            }
          </ul>

          <div className="d-flex justify-content-center mt-5">
            <Pagination>
              <Pagination.Prev disabled={!offset} onClick={() => setOffset((prev) => prev - 1)} />

              <Pagination.Item >Page {offset + 1}</Pagination.Item>

              <Pagination.Next onClick={() => setOffset((prev) => prev + 1)} />
            </Pagination>
          </div>

        </div>
      </div >
    )
};

export default ListRooms;