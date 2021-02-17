import React,{useState,useEffect} from 'react';
import moment from 'moment';
import './App.css';
import { Button,Form } from 'react-bootstrap';
import img from './task.png';

function App() {
  const [text,setText]=useState('');
  const [list,setList]=useState([]);
  const [error,setError]=useState(false);

  useEffect(() => {
    fetchLists();
   }, [])

   const fetchLists=()=>{
     const rem = localStorage.getItem('todo');
     var listUpdated = JSON.parse(rem);
     var arr = listUpdated && listUpdated.length !== 0 ? listUpdated.reverse() : [];
     setList(arr);
   }

   const deleteItem=(id)=>{
    var arr = JSON.parse(localStorage.getItem('todo')) || [];
    var updatedArr = arr.filter(item=> item.key !== id);
    localStorage.setItem('todo',JSON.stringify(updatedArr));
    window.location.reload(false);
  }

  const saveList=()=>{
    if(text.length!==0){
      var arr = JSON.parse(localStorage.getItem('todo')) || [];
      const obj = {
        text: text.trim(),
        key: moment().unix(),
      }
      var saveArr = [...arr,obj];
      localStorage.setItem('todo',JSON.stringify(saveArr));
      window.location.reload(false);
    }
    else {
      setError(true)
    }
  }

  return (
    <div className="app">
      <div className="web">
      <div className="p-4 fixed-top bg">
       <Form className="d-flex w-100">
          <Form.Control
            className="search w-75"
            placeholder="Add your tasks here..."
            onChange={e=>{
              setText(e.target.value);
              setError(false)}}
            maxLength="30"/>
          <Button variant="light" size="sm" onClick={saveList} className="w-25">
             Submit
          </Button>
        </Form>
      </div>
      <div className="container list">
      {error?<div class="text-center font-weight-bold text-danger my-2">Please add a task first.</div> : null}
        {list.length !== 0 ?
          list.map((item,index)=>
          <div key={item.key} className="d-flex justify-content-between align-items-center flex-wrap bg-white my-2 p-3">
            <h5 className="font-weight-bold">{item.text}</h5>
            <div className="d-flex justify-content-end">
              <span>{moment.unix(item.key).format("DD MMM, YYYY")}</span>
              <span className="mx-3">{moment.unix(item.key).format("hh:mm A")}</span>
              <span onClick={()=> deleteItem(item.key)}  className="mr-4">Delete</span>
            </div>
          </div>
      ) :
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img src={img} className="w-50 h-50 mt-5" alt="No tasks found."/>
      </div>}
      {list.length!==0 ?<h5 className="fixed-bottom p-5">#{list.length} task(s) pending</h5>: null}
     </div>
     <div className="d-flex list justify-content-center align-items-center">
      <p className="font-weight-bold mob">This site is available for desktop view only.</p>
     </div>
    </div>
    </div>
  );
}

export default App;
