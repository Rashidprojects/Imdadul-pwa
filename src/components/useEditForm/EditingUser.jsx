import AdminNav from "../AdminNav"
import Form from "./Form"

const EditingUser = () => {
  return (
    <div className="bg-primary h-screen">
        <AdminNav currentSection="Edit User" />
        <div className="bg-light mx-1 sm:mx-6 rounded-lg h-[88%] overflow-y-auto hide-scroll  " 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            <Form />
        </div>
    </div>
  )
}

export default EditingUser