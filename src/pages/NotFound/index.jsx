import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import React from "react";
import { Link } from "react-router-dom";
import './index.css';
const NotFound = () => {
 return <>
  <div id="notfound">
   <div className="notfound">
    <div className="notfound-bg">
     <div></div>
     <div></div>
     <div></div>
    </div>
    <h1>oops!</h1>
    <h2>Error 404 : Page Not Found</h2>
    <Link to={'/'}>Go back</Link>
    <div className="notfound-social">
     <Link to={'https://www.facebook.com/vegetarian2003'}><FacebookIcon fontSize='large' /></Link>
     <Link to={'https://github.com/phamdongchinh683'}><GitHubIcon fontSize='large' /></Link>
    </div>
   </div>
  </div >

 </>
}

export default NotFound;