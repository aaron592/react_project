import {useLocation} from 'react-router-dom';

function Player(props){
   let location = useLocation();
   console.log(location);
    return(
       
                <video controls width="80%" height="500px">
                    <source src={`http://localhost:8000/videos/playnow/player/${location.state}`} type="video/mp4" />
                </video>
           
    )
}


export default Player;