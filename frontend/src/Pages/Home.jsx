import { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import KeepServerAwake from "../Components/KeepServerAwake";

const Home = () => {

    const navigate = useNavigate();
    useEffect(() => {

      
      setTimeout(() => {
        navigate("/seat-no/1")
      }, 5);
  }, []);

  return (

    <div className='flex items-center justify-center h-screen'>
    <KeepServerAwake/>
    </div>
  )
}

export default Home
