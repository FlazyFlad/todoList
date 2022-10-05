import "./App.css";
import { useState } from "react";
import { v4 as uuid } from "uuid";

// button-group
const buttons = [
  {
    type: "all",
    label: "All",
  },
  {
    type: "active",
    label: "Active",
  },
  {
    type: "done",
    label: "Done",
  },
];

// const itemsData = [
//   {
//     key: uuid(),
//     label: "Have fun",
//   },
//   {
//     key: uuid(),
//     label: "Spread Empathy",
//   },
//   {
//     key: uuid(),
//     label: "Generate Value",
//   },
// ];

function App() {
  const [itemToDo, setItemTodo] = useState('');

  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  );

  const [type, setType] = useState("all");

  const [searchValue, setSearchValue] = useState('');

  const handleItemToDo = (event) => {
    setItemTodo(event.target.value);
  };

  const handleAddItem = () => {
    const newObj = { key: uuid(), label: itemToDo };

    localStorage.setItem('items', JSON.stringify([newObj, ...items]))
    setItems((items) => [...items, newObj]);
    setItemTodo("")
  };

  const handleItemDone = (key) => {
    const newArray = items.map((item) => {
      if (item.key === key) {
        return { ...item, isDone: !item.isDone };
      } else return item;
    });

    setItems(newArray);
    localStorage.setItem('items', JSON.stringify(newArray))
  };

  const handleChangeStatus = (type) => {
    setType(type);
  };

  const deleteItem = (key) => {
    const newArray = items.filter((item) => item.key !== key)
    setItems(newArray)
    localStorage.setItem('items', JSON.stringify(newArray))
  }

  const handleItemBold = (key) => {
    const Arr = items.map((item) => {
      if (item.key === key) {
        return { ...item, isBold: !item.isBold };
      } else return item;
    });

    setItems(Arr);
    localStorage.setItem('items', JSON.stringify(Arr))
  }


  const doneItems = items.filter((item) => item.isDone);
  const notDoneItems = items.filter((item) => !item.isDone);
  

    const filteredItems =
    type === "active" ? notDoneItems : type === "done" ? doneItems : items;

    const classifyItems = filteredItems.filter(item =>
    {
      if(searchValue){
        return item.label.toLowerCase().includes(searchValue.toLowerCase())
      }else return item;
    });


  return (
    <div className="todo-app">
      {/* App-header */}
      <div className="app-header d-flex">
        <h1>Todo List</h1>
        <h2>
          {notDoneItems.length} more to do, {doneItems.length} done
        </h2>
      </div>

      <div className="top-panel d-flex">
        {/* Search-panel */}
        <input
          type="text"
          className="form-control search-input"
          placeholder="type to search"
          onChange={(event) => setSearchValue(event.target.value)}
        />
        {/* Item-status-filter */}
        <div className="btn-group">
          {buttons.map((itemB) => (
            <button
              key={itemB.type}
              type="button"
              // type
              className={`btn btn${type === itemB.type ? "" : "-outline"}-info`}
              onClick={() => handleChangeStatus(itemB.type)}
            >
              {itemB.label}
            </button>
          ))}
        </div>
      </div>

      {/* List-group */}
      <ul className="list-group todo-list">
        {classifyItems.map((item) => (
          <li
            key={item.key}
            className="list-group-item"
          >
            {/* <span className={`todo-list-item ${item.isDone ? "done" : ""}`}> */}
            <span className={`todo-list-item ${item.isDone ? "done" : ""} ${item.isBold ? "important" : ""}  `}>
              
              <span onClick={() => handleItemDone(item.key)} className="todo-list-item-label">{item.label}</span>

              <button
                type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick={() => handleItemBold(item.key)}
              >
                <i className="fa fa-exclamation" />
              </button>

              <button
                type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={() => deleteItem(item.key)}
              >
                <i className="fa fa-trash-o" />
              </button>
            </span>
          </li>
        ))}
      </ul>

      <div className="item-add-form d-flex">
        <input
          value={itemToDo}
          onChange={handleItemToDo}
          type="text"
          className="form-control"
          placeholder="What needs to be done"
        />
        <button className="btn btn-outline-secondary" onClick={handleAddItem}>
          Add item
        </button>
      </div>
    </div>
  );
}

export default App;
