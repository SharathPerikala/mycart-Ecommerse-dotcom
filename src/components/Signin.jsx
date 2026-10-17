import React from "react";
function Signin(){
    return (<div className="signinpage">
       <h1><i class="fas fa-people-carry"></i> mycart</h1>
       
        <h1 className="loginh1">Login Here</h1>
    <p>Username</p>
     <input type="text" placeholder="Enter Email/Mobile number"/>
     <p>Password</p>
     <input type="password"placeholder="Enter Password"/>
     <input type="submit"value="Login"/><br/>
     <a href="www.mycart.com">Signup</a><br/>
     <a href="www.mycart.com">Forgot password?</a><br/>
    </div>);
}
export default Signin;