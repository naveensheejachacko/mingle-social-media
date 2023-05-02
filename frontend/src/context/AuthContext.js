import { useState, useEffect, createContext } from "react";
import jwt_decode from 'pyjwt';
import { useNavigate} from 'react-router-dom'
import { ToastContainer,toast } from "react-toastify";
import Cookies from "js-cookie";


const AuthContext = createContext()




export default AuthContext;
export const AuthProvider = ({children}) =>{

    const generateError = (err) => 
        toast.error(err,{
            position: 'bottom-right',
        })

        let [user,setUser] = useState( Cookies.get('jwt_user') ?(jwt_decode(JSON.parse(Cookies.get('jwt_user')).access)):null)
        console.log(user)
        let [authTokens,setAuthTokens] = useState(()=> Cookies.get('jwt_user') ? jwt_decode(Cookies.get('jwt_user')):null)        
        let [currentuser,setCurrentuser] = useState(user?.user_id)
        let [auth_user,setAuth_user] = useState(user?.user_id)


        const [added,setAdded] = useState(false)
        const [content,setContent] = useState([])

        let navigate = useNavigate()
    }