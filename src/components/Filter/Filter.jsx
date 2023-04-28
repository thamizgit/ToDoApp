import './Filter.css'
import { FaFilter } from 'react-icons/fa';
const Filter = ({filter,setFilter}) => {
  return (
    <section className="filter-container">
      <article>
        <p className="filter"><FaFilter />Filter</p>
      </article>
      <article>
        <button
          onClick={() => {
            filter === "low" ? setFilter("") : setFilter("low");
          }}
          className={`low ${filter === "low" ? "active" : null}`}
        >
          Low
        </button>
      </article>
      <article>
        <button
          onClick={() => {
            filter === "medium" ? setFilter("") : setFilter("medium");
          }}
          className={`medium ${filter === "medium" ? "active" : null}`}
        >
          Medium
        </button>
      </article>
      <article>
        <button
          onClick={() => {
            filter === "high" ? setFilter("") : setFilter("high");
          }}
          className={`high ${filter === "high" ? "active" : null}`}
        >
          High
        </button>
      </article>
      <article>
        <button onClick={()=>setFilter("")} className={`all ${filter === "" ? "active" : null}`}>
          All
        </button>
      </article>
    </section>
  );
};
export default Filter;
