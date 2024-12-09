import { useAddUserForm } from "../lib/hooks/useAddUserForm"
import { useForm } from "../lib/providers/FormContext"
import AdminNav from "./AdminNav"
import Loading from "./Loading"
import Form from "./UserDataCollectorParts/Form"

const UserDataCollector = () => {
  const { state } = useForm()
  const { uiState: { isData } } = useAddUserForm()
  return (
    <div className={` bg-primary ${ state.isExtraUser || state.isInstallment || isData ? 'h-auto' : 'h-screen' } px-3 pb-3`}>
      <div className='text-2xl absolute z-20 left-[48%]'>
          {
              state.isLoading ? (
                  <Loading  className = "absolute" />
              ) : ''
          }
        </div>

      <AdminNav currentSection="Add User" />
      <div className={`bg-light ${ state.isExtraUser || state.isInstallment || isData ? 'h-auto' : 'h-[90%]' } pb-36 rounded-xl pt-7 px-2  ${state.isLoading ? 'blur-md' : ''} `}>
        {/* flex justify-center items-center w-full h-auto */}
        <div className=""> 
          <Form />
        </div>
      </div> 
    </div>
  )
}

export default UserDataCollector