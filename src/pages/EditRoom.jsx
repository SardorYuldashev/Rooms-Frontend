import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { EDIT_ROOM } from '../apollo/rooms';

const EditRoom = () => {
  const location = useLocation()
  const props = location.state

  const { id } = useParams();

  let navigate = useNavigate()

  const [name, setName] = useState(props.name);
  const [floor, setFloor] = useState(props.floor);
  const [for_stuff, setForStuff] = useState(props.for_stuff);

  const handlerFunc = (e) => {
    if (e.target.name === "nameInput") {
      setName(e.target.value);
    };

    if (e.target.name === "floorInput") {
      setFloor(Number(e.target.value));
    };

    if (e.target.name === "forStuffInput") {
      setForStuff(Boolean(e.target.value));
    };
  };

  const [updateRoom, { error }] = useMutation(EDIT_ROOM);

  function createRoom(e) {
    e.preventDefault();

    updateRoom({
      variables: {
        "updateRoomId": id,
        "input": {
          "name": name,
          "floor": floor,
          "for_stuff": for_stuff
        }
      }
    });

    navigate('/rooms');
  };

  if (error) {
    return (
      <div className="bg-dark text-light min-vh-100 py-5">
        <div className="container">
          <Link to={`/rooms/create`} className="fs-2 text-light btn btn-success w-25 mb-5">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>

          <div className="d-flex align-items-center justify-content-center flex-column gap-4 mb-5">
            <h2 className="text-center">Error: ${error.message}</h2>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-dark text-light min-vh-100 py-5">
      <div className="container">
        <Link to={`/rooms`} className="fs-2 text-light btn btn-success w-25 mb-5">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <div className="d-flex align-items-center justify-content-center flex-column gap-4 mb-5">
          <h1 className="text-center">EDIT ROOM</h1>
        </div>

        <Form onSubmit={createRoom} className=" text-center d-flex flex-column align-items-center">
          <Form.Group className="mb-3 w-50">
            <Form.Label>Room name</Form.Label>
            <Form.Control
              name="nameInput"
              type="text"
              placeholder="Osmondagi bolalar"
              onChange={handlerFunc}
              value={name}
            />
          </Form.Group>

          <Form.Group className="mb-3 w-50">
            <Form.Label>Floor</Form.Label>
            <Form.Control
              name="floorInput"
              type="number"
              placeholder="Enter a number"
              onChange={handlerFunc}
              value={floor}
            />
          </Form.Group>

          <Form.Group className="mb-3 w-50">
            <Form.Label>For stuff</Form.Label>
            <Form.Select
              name="forStuffInput"
              id="for_stuff"
              onChange={handlerFunc}
            >
              <option value="">Select</option>
              <option value="1">Stuff room</option>
              <option value="">Class room</option>
            </Form.Select>
          </Form.Group>

          <button type="submit" className="btn btn-success w-25 mt-3">Edit</button>
        </Form>

      </div>
    </div>
  );
};

export default EditRoom;