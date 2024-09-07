"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Add, Clear, Remove } from "./Redux/TodoSlice";

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
      <div className="flex flex-col items-center gap-3 py-8 w-full bg-gradient-to-tl from-green-300 to-pink-400">
        <h2 className="text-3xl font-bold">Add Item</h2>
        <input
          placeholder="Enter Item"
          value={item}
          type="text"
          onChange={(e) => setItem(e.target.value)}
          onKeyDown={handleKeyDown} // Trigger add on Enter key press
          className="border border-black h-10 outline-none w-[80%] md:w-[60%] rounded-md pl-3 placeholder:text-gray-800 bg-gradient-to-r from-pink-400 to-green-400 "
        />
        <button
          onClick={handleClick}
          className="bg-gradient-to-b from-green-300 to-pink-400 w-40 rounded-md h-10 text-2xl text-black shadow-lg hover:bg-gradient-to-tl hover:from-pink-300 hover:to-green-400 font-serif duration-500"
        >
          Add
        </button>
      </div>

      {/* Display Section */}
      <div className="bg-gradient-to-tl from-green-400 via-red-400 to-pink-300 min-h-[430px] w-full flex flex-col py-8 items-center gap-4 text-black">
        <div className="flex flex-row gap-12 items-center ">
          <h2 className="text-2xl">All Added Items</h2>
          <button onClick={() => dispatch(Clear())} className="text-2xl">
            Clear All
          </button>
        </div>

        {items.length > 0 ? (
          <div className="flex flex-col gap-4 w-full">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-green-300 to-pink-400 px-4 py-2 rounded-md shadow-lg border border-black flex flex-row mx-auto justify-between w-[80%] md:w-[60%] items-center text-black"
              >
                <h2 className="text-[25px]">{item}</h2>
                <button
                  className="bg-gradient-to-r from-red-500 to-green-500 font-semibold shadow-lg px-2 py-1 rounded-md"
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
