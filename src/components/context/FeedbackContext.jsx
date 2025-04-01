import React, { createContext } from 'react'
import { useState,useContext } from 'react'

const FeedbackContext = createContext();



export const FeedbackProvider = ({children}) => {


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

  return (
    <FeedbackProvider value={{
        feedback
    }}>
      {children}
    </FeedbackProvider>
  )
}

export default FeedbackContext
