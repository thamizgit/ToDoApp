
import "./NewItem.css";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewItem = ({ list, setList, setIsLoading , setFilter , isCompleted , setIsCompleted}) => {
  const [item, setItem] = useState("");
  const [priority, setPriority] = useState("");
  const handleSave = async (item, priority) => {
    
    try {
      if (!item || !priority) {
        alert("Item name and priority is required");
        return;
      }
      const new_item = {
        title: item,
        priority: priority,
        isCompleted: isCompleted,
      };
      setIsLoading(true);
       const result = await fetch(
         "https://todo-app-backend-uocn.onrender.com/list",
         {
           method: "POST",
           headers: {
             Accept: "application/json, text/plain",
             "Content-Type": "application/json",
           },
           body: JSON.stringify(new_item),
         }
       );  //db_save (backend_node)
      const new_it = await result.json();
      new_item._id = new_it._id;
      console.log(new_item);
      const new_list = [...list, new_item];
      setList(new_list);
      setItem("");
      setPriority("");
      setFilter("");
      setIsCompleted(false);
      toast(` "${new_it.title}" added successfully`);
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setIsLoading(false);
    }
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleSave(item, priority);
    }
  }
  const handleClear = () => {
    setPriority('');
    setItem('');
  }
  return (
    <section className="new-item-card-container">
      <section className="new-item-card">
        {!isCompleted && (
          <article
            onClick={() => setIsCompleted(!isCompleted)}
            className="checkbox"
          />
        )}
        {isCompleted && (
          <span
            onClick={() => setIsCompleted(!isCompleted)}
            className="material-symbols-outlined select"
          >
            select_check_box
          </span>
        )}
        <article className="form-container">
          <input
            placeholder="Add New Item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </article>
      </section>
      {item && (
        <section className="new-item-card-priority ">
          <button
            onClick={() => {
              priority === "low" ? setPriority("") : setPriority("low");
            }}
            className={`low ${priority === "low" ? "active" : null}`}
          >
            Low
          </button>
          <button
            onClick={() => {
              priority === "medium" ? setPriority("") : setPriority("medium");
            }}
            className={`medium ${priority === "medium" ? "active" : null}`}
          >
            Medium
          </button>
          <button
            onClick={() => {
              priority === "high" ? setPriority("") : setPriority("high");
            }}
            className={`high ${priority === "high" ? "active" : null}`}
          >
            High
          </button>
        </section>
      )}
      {item && (
        <section className="new-item-card-buttons">
          <button
            onClick={() => handleSave(item, priority)}
            className="button primary"
          >
            Save
          </button>
          <ToastContainer />
          <button onClick={() => handleClear()} className="button clear">
            Clear
          </button>
        </section>
      )}
    </section>
  );
};
export default NewItem;
