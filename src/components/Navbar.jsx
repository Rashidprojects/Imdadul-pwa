import { useNavigate } from "react-router-dom"
import { useOnlineStatus } from "../lib/hooks/useOnlineStatus";

const Navbar = () => {
    const navigate = useNavigate()

    const isOnline = useOnlineStatus()

  return (
    <div className="flex gap-4 items-center justify-center text-2xl">
        <button onClick={() => navigate('/admin-portal')}>Admin</button>
        <button onClick={() => navigate('/')}>Dashboard</button>
        <button onClick={() => navigate('/zhome')}>Home</button>
        <button>Connection Status: {isOnline ? "Online" : "Offline"}</button>
    </div>
  )
}

export default Navbar