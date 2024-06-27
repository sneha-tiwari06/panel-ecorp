import React from 'react'
import"./nav.css"
import { Link } from 'react-router-dom'
function Navbar() {
    
  return (
    <div>
        <aside>
            <div>Menu</div>
 <Link to="/home">
    <i class="fa fa-user-o" aria-hidden="true"></i>
   Query Mails
  </Link>
 <Link to="/formSubmission">
     <i class="fa fa-laptop" aria-hidden="true"></i>
    Form Submissions
  </Link>
 <Link to="/jobApplications">
    <i class="fa fa-star-o" aria-hidden="true"></i>
    Job Applications
  </Link>
  
</aside>


    </div>
  )
}

export default Navbar