import './TodoListItem.css';
import '../../NewItem/NewItem.css'
import { useState } from 'react';
import { FaTrash } from "react-icons/fa";
import { FaPen } from 'react-icons/fa';
const TodoListItem = ({ title, priority,id,isCompleted,handleDelete,index,list,setList,setIsLoading,handleComplete }) => {
  const [isChecked, setChecked] = useState(false);
  const [editClick, setEditClick] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editPriority, setEditPriority] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const handleEdit = (id) => {
    setEditClick(true);
    const item = list.find((it) => it._id == id);
    console.log(item);
    setEditTitle(item.title);
    setEditPriority(item.priority);
    setIsComplete(item.isCompleted);
  }
  const handleEditSave = async (id) => {
    const filtered = list.filter((it) => it._id === id);
    const remaining = list.filter((it) => it._id !== id);
    filtered.title = editTitle;
    filtered.priority = editPriority;
    filtered.isCompleted = isComplete;
    try {
      setIsLoading(true);
      await fetch("https://todo-app-backend-uocn.onrender.com/list", {
        method: "PATCH",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          title: editTitle,
          priority: editPriority,
          isCompleted: filtered.isCompleted,
        }),
      });
      const new_list = [filtered, ...remaining];
      setList(new_list);
      setEditClick(false);
      setEditTitle('');
      setEditPriority('');
    }
    catch {
      console.log(err);
    }
    finally {
      setIsLoading(false);
    }
  }
  
  return (
    <section>
      <article className={`item-card ${priority} ${editClick ? "blur" : null}`}>
        {!isCompleted ? (
          <span onClick={() => handleComplete(id)} className="checkbox" />
        ) : (
          <span
            onClick={() => handleComplete(id)}
            className="material-symbols-outlined select"
          >
            select_check_box
          </span>
        )}
        <article className={`card-title ${isCompleted ? "strike" : null} `}>
          {title}
        </article>

        <article className={`badge ${priority}`}>
          <h5>{priority.toUpperCase()}</h5>
        </article>
        <article>
          <FaPen onClick={() => handleEdit(id)} className="edit-icon" />
        </article>
        <article>
          <FaTrash
            onClick={() => handleDelete(id)}
            className="delete-icon"
            aria-label="delete"
          />
        </article>
      </article>

      {editClick && (
        <article className="edit-container">
          <article className="edit-container-card">
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            ></input>
          </article>
          <article className="edit-container-priority">
            <button
              onClick={() => setEditPriority("low")}
              className={`low ${editPriority === "low" ? "active" : null}`}
            >
              Low
            </button>
            <button
              onClick={() => setEditPriority("medium")}
              className={`medium ${
                editPriority === "medium" ? "active" : null
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setEditPriority("high")}
              className={`high ${editPriority === "high" ? "active" : null}`}
            >
              High
            </button>
          </article>
          <article className="edit-container-buttons">
            <button onClick={() => handleEditSave(id)}>Save</button>
          </article>
        </article>
      )}
    </section>
  );
}
export default TodoListItem