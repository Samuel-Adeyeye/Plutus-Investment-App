// import React from 'react'
import { Link } from "react-router-dom"

function Error404() {
     return <>
          <h1>Page not found</h1>
          <Link to="/">
               <button>HOME</button>
          </Link>
     </>
  
}

export default Error404
