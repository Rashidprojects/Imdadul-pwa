import  { useEffect, useState } from "react";
import { IoIosArrowDropdownCircle,  IoIosArrowDropupCircle } from "react-icons/io";

const CustomSelect = ({ onSelectionChange, reset }) => {
    const defaultOptions = [
    { id: 0, value: "", name: "Filter users by area", status: true },
    { id: 1, value: "A1", name: "Area 1", status: false },
    { id: 2, value: "A2", name: "Area 2", status: false },
    { id: 3, value: "A3", name: "Area 3", status: false },
    { id: 4, value: "A4", name: "Area 4", status: false },
  ];

  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState(defaultOptions);

  // Reset options when the reset prop changes
  useEffect(() => {
    if (reset) {
      setOptions(defaultOptions);
      if (onSelectionChange) {
        onSelectionChange(""); // Notify parent of reset
      }
    }
  }, [reset]);

  // Function to handle click on an option
  const handleOptionClick = (id) => {
    const updatedOptions = options.map((item) =>
      item.id === id ? { ...item, status: true } : { ...item, status: false }
    );
    setOptions(updatedOptions);

    // Find the clicked item's value and pass it to the parent
    if (id !== 0) {
        const selectedOption = updatedOptions.find((item) => item.id === id);
        if (onSelectionChange) {
        onSelectionChange(selectedOption.value); // Call the parent's callback
        }
    }

  };

  return (
    <div className=" w-[230px] sm:w-[240px] relative">
      {/* Display the selected option */}
      <div className="border-2 flex items-center justify-between border-primary cursor-pointer rounded-md p-1 sm:p-2">
        {options.map(
          (item) =>
            item.status && <p key={item.id} className="font-medium sm:text-[18px] px-3" >{item.name}</p> // Only show the active option
        )}
        <div onClick={() => setShowOptions(!showOptions)}>
        {
            !showOptions ? (<IoIosArrowDropdownCircle className="text-[23px] text-primary"/>) : 
            (<IoIosArrowDropupCircle className="text-[23px] text-primary"/>)
        }
        </div>
      </div>

      {/* Display all options */}
      <div className={`flex flex-col ${!showOptions ? 'hidden' : ''}  absolute border border-secondary bg-light w-[230px] sm:w-[240px] rounded-md mt-1 z-30`}>
        {options.map((item) => (
          <p
            key={item.id}
            onClick={() => { handleOptionClick(item.id),  setShowOptions(!showOptions) }}
            className={` cursor-pointer hover:text-primary sm:text-[20px] py-2 px-4 ${ item.status ? 'bg-secondary text-light' : '' } `} 
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
