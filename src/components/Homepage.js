import {useEffect, useState,useRef} from "react";
import {useNavigate} from "react-router-dom";

function Homepage(){

    let [videos, setVideos] = useState([]);
    let navigate = useNavigate();

    let token=useRef(JSON.parse(localStorage.getItem("user")).token);
 
    useEffect(()=>{

        
        fetch("http://localhost:8000/videos/",{
            method:"GET",
            headers:{
                "Authorization": `Bearer ${token.current}`
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            setVideos(data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    function playVideo(video_id){
        let user_id = JSON.parse(localStorage.getItem("user")).user_id;

        fetch(`http://localhost:8000/videos/${user_id}/${video_id}`,{
            method:"GET",
            headers:{
                "Authorization": `Bearer ${token.current}`
            }
        })
        .then(response => response.json())
        .then((data)=>{

            if(data.success===true){
                navigate("/player",{state:video_id});
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return(
        <div className="Container">
            <div className="navBar">
                <div className="dash_logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" />
                </div>
                <div className="account">
                   <p>Welcome, <b>{JSON.parse(localStorage.getItem("user")).name}</b></p>
                </div>
            </div>
            <div className="videos">
                <h1>All Videos</h1>
            </div>
            <div className="video" >
            {
                videos.map((video,index)=>{
                    return(
                        
                           <div className="video_container" key={index}>
                                <img src={video.thumbnail} alt={video.name}/>
                                 <div className="desc">
                                     <h2>{video.name}</h2>
                                     <div className="desc_btn">
                                         <button onClick={()=>{playVideo(video._id)}}>Play</button>
                                         <p>{video.runtime} hr</p>
                                     </div>
                      
                                 </div>
                   
                            </div>
                
                        
                    )
                })
            }
            </div>
        </div>
    )


}

export default Homepage;