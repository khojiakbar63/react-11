import { useState, useReducer, useEffect } from "react";

const App = () => {
  
  // Initial state
  const initialState = {
    count: 0,
    post: [],
    postLength: 0,
    load: true,
  }

  

  // Reducer
  const [{count, post, postLength, load}, dispatch] = useReducer(reducer, initialState)

  // Commiting
  function reducer(condition, action){
    switch(action.type){
      case "INCREMENT": return {...condition, count: condition.count+1}
      case "DECREMENT": return {...condition, count: condition.count-1}
      case "RESET":     return {...condition, count:0}
      case "SET_POST":  return {...condition, post:action.payload}
      case "STOP_LOAD": return {...condition, load: false}
      case "SET_LENGTH": return {...condition, postLength: action.payload}
      default: throw new Error('Something wrong!')
    }

  }
  useEffect(()=>{
    fetch(`https://jsonplaceholder.typicode.com/comments`)
    .then((req)=>req.json())
    .then((res)=>{
      dispatch({type: "SET_POST", payload:res})
      dispatch({type: "STOP_LOAD"})
      dispatch({type: "SET_LENGTH", payload:res.length})
    })
  }
  )





  // RENDERING TO UI
  return (
    <div className="container mx-auto">
      <h1>{count}</h1>
      <button onClick={()=>dispatch({type:"INCREMENT"})}>INCREMENT</button>
      <button onClick={()=>dispatch({type:"DECREMENT"})}>DECREMENT</button>
      <button onClick={()=>dispatch({type:"RESET"})}>RESET</button>
      <button onClick={()=>dispatch({type:"SET_POST"})}>SET POST</button>


      
        {load ? <h1>Loading. . .</h1> : ""}


        <ul>
          {
            postLength && post.map((item)=>{
              return <li key={item.id} >Title: {item.name} </li>
            })
          }
        </ul>
      
    </div>
  );
};

export default App;
