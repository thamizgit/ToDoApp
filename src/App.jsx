import './App.css'
import TodoList from './components/TodoList/TodoList'
import NewItem from './components/NewItem/NewItem'
import Filter from './components/Filter/Filter';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from 'react';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState('');

  const notify = () => toast("Deleted Successfully");

  const handleDelete = async (id) => {
    try {

      setIsLoading(true);
      await fetch("https://todo-app-backend-uocn.onrender.com/list", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      const new_list = list.filter((item) => item._id !== id);
      setList(new_list);  
      toast(`deleted successfully`);
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setIsLoading(false);
    }
  };
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const result = await fetch("https://todo-app-backend-uocn.onrender.com/list");
      const data = await result.json();
      console.log(data);
      setList(data);
    } catch (err) {
      console.log("error");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    
    fetchData();
  }, [])
  useEffect(() => {

    const fetchPriority = async () => {
      if (!filter) {
        fetchData();
        return;
      }
      try {
        setIsLoading(true);
        const result = await fetch(
          `https://todo-app-backend-uocn.onrender.com/list/${filter}`
        );
        const data = await result.json();
        setList(data);
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchPriority();
  }, [filter])
  const [isCompleted, setIsCompleted] = useState(false);
  return (
    <main className={`app ${isLoading && 'blur'}`}>
      <h1 className='title'>ToDo List</h1>
      <NewItem list={list} setList={setList} setIsLoading={setIsLoading} setFilter={setFilter} isCompleted={isCompleted} setIsCompleted={setIsCompleted} />
      <Filter filter={filter} setFilter={setFilter} />
      <TodoList list={list} handleDelete={handleDelete} setList={setList} setIsLoading={setIsLoading} />
      <ToastContainer />
    </main>
  )
}

export default App
