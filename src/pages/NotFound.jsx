import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {

  return (
    <div className="bg-dark text-light min-vh-100 d-flex flex-column align-items-center justify-content-center gap-5">
      <h1>Xona topilmadi</h1>

      <Link to={`/`} className="fs-2 text-light btn btn-success w-25 mb-5">
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
    </div>
  )
}

export default NotFound