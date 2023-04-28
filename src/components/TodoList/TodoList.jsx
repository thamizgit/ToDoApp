import TodoListItem from "./TodoListItem/TodoListItem"
import { useState } from "react";
const TodoList = ({list,handleDelete,setList,setIsLoading}) => {
  const numberOfCom = list.filter((it) => it.isCompleted === true);
  const n = numberOfCom.length;
  const handleComplete = async (id) => {
    const data = list.find((it) => it._id === id);
    data.isCompleted = !data.isCompleted;
    try {
      setIsLoading(true);
      await fetch('http://localhost:3000/list/update', {
        method: 'PATCH',
        headers: {
          Accept: 'application/json, text/plain',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id
        })
      })
    
      const rem = list.filter((it) => it._id !== id);
      const new_list = [...rem, data];
      setList(new_list);
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setIsLoading(false);
    }
    }

  
    return (
      <>
        <article>
          {list.length > 0 ? (
            list.map((item, index) => (
              <TodoListItem
                key={index}
                title={item.title}
                priority={item.priority}
                id={item._id}
                isCompleted={item.isCompleted}
                handleDelete={handleDelete}
                index={index}
                list={list}
                setList={setList}
                setIsLoading={setIsLoading}
                handleComplete={handleComplete}
              />
            ))
          ) : (
            <p
              style={{
                color: "red",
                textAlign: "center",
                margin: "2rem auto",
              }}
            >
              {" "}
              No items to display
            </p>
          )}
        </article>
        {list.length>0 &&
          <article>
          
            <p style={{ textAlign: "center" }}> {`${n} tasks completed out of ${list.length} tasks`} </p>
          </article>}
      </>
    );
}
export default TodoList