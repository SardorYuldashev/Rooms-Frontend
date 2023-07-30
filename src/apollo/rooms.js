import { gql } from "@apollo/client";

export const GET_ROOMS = gql`
  query listRooms($input: QueryRoomsInput) {
    roomsList: rooms(input: $input) {
      list {
        id
        name
        floor
        for_stuff
      }
      offset
      limit
      total
    }
  }
`;

export const SHOW_ROOM = gql`
  query showRoom($roomId: ID!) {
    room: room(id: $roomId) {
      id
      name
      floor
      for_stuff
    }
  }
`;

export const NEW_ROOM = gql`
  mutation CreateRoom($input: CreateRoomInput!) {
    addedRoom: createRoom(input: $input) {
      id
      name
      floor
      for_stuff  
    }
  }
`;

export const EDIT_ROOM = gql`
  mutation UpdateRoom($updateRoomId: ID!, $input: UpdateRoomInput!) {
    updatedRoom: updateRoom(id: $updateRoomId, input: $input) {
      id
      name
      floor
      for_stuff
    }
  }
`

export const REMOVE_ROOM = gql`
  mutation RemoveRoom($removeRoomId: ID!) {
    removedRoom: removeRoom(id: $removeRoomId) {
      id
      name
      floor
      for_stuff
    }
  }
`