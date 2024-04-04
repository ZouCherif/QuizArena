import React, { useState, useEffect } from "react"; 
import { FaTrophy  } from "react-icons/fa";
import { useNavigate,useLocation } from "react-router-dom";
function RankButton(){
    const location = useLocation();
    const navigate = useNavigate();
    const [showRankButton, setShowRankButton] = useState(false);
    const handleRankingButton = ()=>{
        navigate("/Ranking");
    }
    useEffect(() => {
        if(location.pathname==="/Ranking"){
            setShowRankButton(false);
        }
        else setShowRankButton(true);
            
    }, [location]);

    return(
        <div>
            {showRankButton && (<button className=" bg-[#6541F5] px-5 py-1 rounded-md flex " onClick={handleRankingButton} >
               Classement
               <FaTrophy className="md:mr-2 mt-1 ml-3 " size={15} />
           </button>)
            }
        </div> 
    );
}

export default RankButton;