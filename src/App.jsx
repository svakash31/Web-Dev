import { useState } from "react";
import FeedbackList from "./components/FeedbackList.jsx";
import Header from "./components/header.jsx";
import FeedbackForm from "./components/FeedbackForm.jsx";
import { v4 as uuidv4 } from 'uuid';



const App = () => {

  const [feedback,setFeedback] = useState([
    {
      id:1,
      text:'This is sample 1'
    },
    {
      id:2,
      text:'This is sample 2'
    },
    {
      id:3,
      text:'This is sample 3'
    }
  ]);

  const addTask = (newFeedback) =>{
    newFeedback.id = uuidv4();
    setFeedback([newFeedback,...feedback]);
  }

  const deleteTask = (id) => {
    setFeedback(feedback.filter(item => item.id != id))
  }

  return (
    <div>
      <Header/>
      <FeedbackForm handleAdd={addTask}/>
      <div className="container">
        
        <FeedbackList feedback={feedback} handleDelete={deleteTask}/>
      </div>
      
    </div>
  );
};

export default App;
