"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Add, Remove } from "./Redux/TodoSlice";

function TodoPage() {
  const [item, setItem] = useState("");
  const dispatch = useDispatch();

  // Fetching items from the Redux store
  const items = useSelector((state) => state.Todo);

  const handleClick = () => {
    if (item.trim()) {
      dispatch(Add(item));
      setItem(""); // Clear input after adding
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick(); // Add item on pressing "Enter"
    }
  };

  const handleDelete = (index) => {
    dispatch(Remove(index));
  };

  return (
    <div className="flex flex-col font-serif items-center min-h-screen">
      {/* Input Section */}
      <div className="flex flex-col items-center gap-3 py-8 w-full bg-gray-400">
        <h2 className="text-3xl font-bold">Add Item</h2>
        <input
          placeholder="Enter Item"
          value={item}
          type="text"
          onChange={(e) => setItem(e.target.value)}
          onKeyDown={handleKeyDown} // Trigger add on Enter key press
          className="border border-black h-10 outline-none w-72 rounded-md pl-3 placeholder:text-gray-500"
        />
        <button
          onClick={handleClick}
          className="bg-blue-800 w-40 rounded-md h-10 text-2xl text-white font-serif"
        >
          Add
        </button>
      </div>

      {/* Display Section */}
      <div className="bg-slate-700 min-h-[430px] w-full flex flex-col py-8 items-center gap-4 text-white">
        <h2 className="text-2xl">All Added Items</h2>
        {items.length > 0 ? (
          <div className="flex flex-col gap-4 w-full">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-gray-500 px-4 py-2 rounded-md flex flex-row mx-auto justify-between w-[80%] items-center"
              >
                <h2 className="text-[25px]">{item}</h2>
                <button
                  className="bg-red-500 px-2 py-1 rounded-md"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-2xl h-full flex capitalize flex-col items-center justify-center">
            No items added yet
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoPage;
