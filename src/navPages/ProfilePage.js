import { useEffect } from "react"
import { useAuth } from "../Context/AuthContext"
import { useNavigate } from "react-router-dom";

export default function(){
    const {id} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!id) navigate('/login');
    },[id])
    return(
        <h1>Profile</h1>
    )
}