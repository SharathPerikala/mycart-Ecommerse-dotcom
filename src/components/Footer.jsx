import React from "react";


function Footer(){
    const currentYear=new Date().getFullYear();
    return<div>
        <div className="topstories"></div>
        <footer>
   <a href="www.facebook.com"> <i class="social-icon fab fa-facebook-f"></i></a>
   <a href="www.twitter.com"><i class="social-icon fab fa-twitter"></i></a>
   <a href="www.instagram.com"><i class="social-icon fab fa-instagram"></i></a>
   <a href="www.linkedin.com"><i class="social-icon fab fa-linkedin"></i></a>
   <a href="www.envelop.com"><i class="social-icon fas fa-envelope"></i></a>
        <h6>Copyright ©{currentYear} MyCart<i class="fas fa-people-carry"></i></h6>
        </footer>
        
    </div>
}
export default Footer;