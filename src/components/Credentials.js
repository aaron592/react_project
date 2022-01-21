
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Credentials(){

   let [cred,setCred] = useState("register");

   let[message,setMessage] = useState(null);

   let navigate = useNavigate();

   let user={};
   function readValue(property,value){
      user[property]=value;
   }

   function changeCred(){
      if (cred==="register"){
         setCred("login")
      }else{
         setCred("register")
      }
   }

   function register(){
      fetch("http://localhost:8000/user/register",{
         method:"POST",
         headers:{
            "Content-Type":"application/json"
         },
         body:JSON.stringify(user)
      })
      .then(response => response.json())
      .then((data) => {
         setMessage(data.message);
         setTimeout(()=>{
            setMessage(null)
         },8000)
      })
      .catch((err) => {
         console.log(err)
      })
   }


   function login(){
      fetch("http://localhost:8000/user/login",{
         method:"POST",
         headers:{
            "Content-Type":"application/json"
         },
         body:JSON.stringify(user)
      })
      .then((response)=>response.json())
      .then((data) => {
         console.log(data)
         if(data.success===true){
            localStorage.setItem("user",JSON.stringify(data));
            navigate("/homepage");
         }else{
            setMessage(data.message);
            setTimeout(()=>{
               setMessage(null);
            },8000)
         }
      })
      .catch((err) => {
         console.log(err);
      })
   }
   return(
      <div className="credentials">
          <div className="overlay">
            <div className="navBar">
              <div className="logo">
                    <img src="https://cdn.icon-icons.com/icons2/3053/PNG/512/netflix_macos_bigsur_icon_189917.png" />
                    
               </div>
            </div>
            <div className="container">
              <div className="signup">
                 <div className="Logo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" />
                    {
                  message!==null?
                  (
                     <div className="toast">
                       <h4>{message}</h4>
                     </div>
                  ):
                  null
               }
                 </div>  
                 

                 {
                    cred==="register"?
                    (
                     <div className="register">
                            <input type="text" placeholder="Full Name" onChange={(event)=>{
                               readValue('name',event.target.value)
                            }}/>
                            <input type="email" placeholder="Email" onChange={(event)=>{
                               readValue('email',event.target.value)
                            }}/>
                            <input type="text" placeholder="Username" onChange={(event)=>{
                               readValue('username',event.target.value)
                            }}/>
                            <input type="password" placeholder="Password" onChange={(event)=>{
                               readValue('password',event.target.value)
                            }}/>
                            <button onClick={register}>Register</button>
                            <p className="change" onClick={changeCred}>
                            {
                                cred==="register" ?
                                ("Already Registered? Login"):
                                ("Not Registered? Register")
                            }
                            </p>
                         
                     </div>
                    ):
                    (
                     <div className="login">
                          <input type="text" placeholder="Username" onChange={(event)=>{
                               readValue('username',event.target.value)
                            }}/>
                          <input type="password" placeholder="Password" onChange={(event)=>{
                               readValue('password',event.target.value)
                            }}/>
                          <button onClick={login}>Login</button>
                          <p className="change" onClick={changeCred}>
                          {
                              cred==="register" ?
                              ("Already Registered? Login"):
                              ("Not Registered? Register")
                          }
                          </p>

                     </div>
                    )
                 }
               
  
              </div>
            </div>
         </div>
      </div>
      )
    
}

export default Credentials;