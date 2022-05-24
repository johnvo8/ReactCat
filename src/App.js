import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';

/* Dynamically add or remove new rows to an existing table */

// TODO: N/A

// Table
function Table(props) {
  const [add, setAdd] = useState();

  // let tableRows;
  // const initialize = () => {
  //   console.log(props.insert);
  //   tableRows = props.insert.map((row) => {
  //     return (<tr><td>{row.id}</td><td>{row.fact}</td></tr>);
  //   })
  // };
  // initialize();

  return (
    <table id="masterTable">
      <thead>
        <tr>
          <th colSpan="2">Cat Facts</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="firstCol">1</td>
          <td>Sample cat fact.</td>
        </tr>
        <tr>
          <td className="firstCol">2</td>
          <td>Sample cat fact number 2.</td>
        </tr>
        {props.insert.map((row) => {
          return (<tr key={row.id}><td className="firstCol">{row.id}</td><td>{row.fact}</td></tr>);
        })}
      </tbody>
    </table>
  );
}


// Button
function Button(props) {
  return (
    <button type="button"
      className="rowButton"
      onClick={props.func}>
      {props.name}
    </button>
  );
}


// App
function App(props) {
  const [title, setTitle] = useState("The Cat Fact App");
  const [rows, setRows] = useState([{ id: 3, fact: "The cat fact." }]);
  const [count, setCount] = useState(3);

  function titleChange() {
    console.log("Title changed.");
    if (title == "The Cat Fact App")
      setTitle("The Not So Cat Fact App");
    else
      setTitle("The Cat Fact App");
  }

  function addRow() {
    fetch('https://catfact.ninja/fact')
      .then(response => response.json())
      .then(data => {
        setCount(count + 1);
        let obj = { id: count + 1, fact: data.fact };
        setRows(rows => [...rows, obj])
      });
  }

  function deleteRow() {
    if (count > 2)
      setCount(count - 1);
    let size = rows.length;
    let newArray = rows.splice(0, size - 1);
    setRows(currentArray => newArray);
  }

  useEffect(() => {
    let length = rows.length;
    if (length > 0)
      console.log(`Rows: ${rows[length-1].fact}`);
  })

  return (
    <div>
      <h1>{title}</h1>
      <h1>{rows.length > 0 && "Third Fact: " + rows[0].fact}</h1>
      <Table insert={rows}></Table>
      <br />
      <Button name="Change Title" func={titleChange}></Button>
      <br />
      <Button name="Add Row" func={addRow}></Button>
      <br />
      <Button name="Delete Row" func={deleteRow}></Button>
    </div>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
