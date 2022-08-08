import React, { useRef, useState } from "react";
import "./Login.css";
import { Room, Cancel } from "@material-ui/icons";
import axios from "axios";

function Login(props) {
  
  const [fail, setFail] = useState(false);

  const nameRef = useRef();
  const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            username:nameRef.current.value,
            password:passwordRef.current.value
        };

        try{
            const res = await axios.post("/users/login",newUser);
            props.myStorage.setItem("user",res.data.username);
            props.setCurrentUser(res.data.username);
            props.setShowLogin(false);
            setFail(false);
            
        }catch(err){
            setFail(true);
        }
    };

  return (
    <div className="loginContainer">
      <div className="logo">
        <Room /> <b style={{weight:"1000"}}>Pin_It </b>  : Pin your World
      </div>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef}></input>
    
        <input type="password" placeholder="password" ref={passwordRef}></input>

        <button>Login</button>


        {fail && (
          <span className="failure">An error occured while Logging</span>
        )}
      </form>
      <Cancel className="loginCancel" onClick={() => props.setShowLogin(false)}/>
    </div>
  );
}


export default Login;