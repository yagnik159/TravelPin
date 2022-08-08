import React, { useRef, useState } from "react";
import "./Register.css";
import { Room, Cancel } from "@material-ui/icons";
import axios from "axios";

function Register(props) {
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            username:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value
        };

        try{
            await axios.post("/users/register",newUser);
            setFail(false);
            setSuccess(true);
        }catch(err){
            setFail(true);
        }
    };

  return (
    <div className="registerContainer">
      <div className="logo">
        <Room /> <b style={{weight:"1000"}}>Pin_It </b>  : Pin your World
      </div>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef}></input>
        <input type="email" placeholder="email" ref={emailRef}></input>
        <input type="password" placeholder="password" ref={passwordRef}></input>

        <button>Register</button>

        {/* // If login is done Succesful */}

        {success && (
          <span className="success">
            Register Succesful, Login to Continue.
          </span>
        )}

        {fail && (
          <span className="failure">An error occured while Registering</span>
        )}
      </form>

        {/* Cancel Button */}
        
      <Cancel className="registerCancel" onClick={() => props.setShowRegister(false)}/>
    </div>
  );
}

export default Register;
