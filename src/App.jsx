import { Route, Routes } from "react-router-dom"
import ListRooms from "./pages/ListRooms"
import ShowRoom from "./pages/ShowRoom"
import NotFound from "./pages/NotFound"
import AddRoom from "./pages/AddRoom"
import EditRoom from "./pages/EditRoom"
import DeleteRoom from "./pages/DeleteRoom"
import Layout from "./pages/Layout"


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<ListRooms />} />
          <Route path="/rooms/:id" element={<ShowRoom />} />
          <Route path="/rooms/create" element={<AddRoom />} />
          <Route path="/rooms/edit/:id" element={<EditRoom />} />
          <Route path="/rooms/delete/:id" element={<DeleteRoom />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App;