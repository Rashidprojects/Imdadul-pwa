import { Route, Routes } from "react-router-dom"
import Admin from "../app/admin/Admin"
import Dashboard from "../app/admin/Dashboard"
import Home from "../app/(landingPage)/Home"
import ProtectedRoute from "./ProtectedRoute"
import UserCollector from "../app/admin/UserCollector"
import Profile from "../app/admin/Profile"
import EditingUser from "../components/useEditForm/EditingUser"

const AppRouter = () => {
  return (
    <div>
        <Routes>

          {/* <Route path='/' element={<Home />} /> */}
          <Route path='admin-portal' element={<Admin />} />
          <Route path='/' element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
          <Route path='add-user' element={ <ProtectedRoute> <UserCollector /> </ProtectedRoute>} />
          <Route path='edit' element={ <ProtectedRoute> <EditingUser /> </ProtectedRoute>} />
          <Route path='view-profile' element={ <ProtectedRoute> <Profile /> </ProtectedRoute>} />
        </Routes>
    </div>
  )
}

export default AppRouter
