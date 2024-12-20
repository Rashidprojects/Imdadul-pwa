import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog/alert-dialog";
  
  const DeleteUserDialog = ({ onConfirm }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild >
        <button className="bg-red-500 text-white px-14 py-3 rounded-md font-semibold">
          Delete User
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete the user?</AlertDialogTitle>
          <AlertDialogDescription>
          This action cannot be undone and will permanently delete the user and their data. 
          Are you sure you want to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className = "bg-red-500 hover:bg-red-600 text-white"
          >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  
  export default DeleteUserDialog;