import React, { useState, useEffect } from "react";

import Card from './shared/Card'
import Button from './shared/Button'

const FeedbackForm = ({handleAdd}) => {


    const [text,setText] = React.useState('');
    const [buttonDisabled,setButtonDisabled] = React.useState(true);
    const [message,setMessage] = useState('');

    const handleTextChange = (e) => {
        const trimmedText = e.target.value.trimStart();

        let textError = "";
        if(trimmedText.length < 10){
            textError = "Character must be at least 10";
            setMessage(textError);
            setButtonDisabled(true);
        }else{
            setMessage("");
            setButtonDisabled(false);
        }
        setText(trimmedText);
    }

    const handlesubmit = (e) =>{
        e.preventDefault();
        handleAdd({text});
        setText("");
    }

  return (
    <Card>
        <h3>Add your reviews</h3>

        <form onSubmit={handlesubmit}>
            <div className="input-group">
                <input type="text" placeholder="Enter your reviews" value={text} onChange={handleTextChange}/>
                    <Button version="primary" type="submit" isDisabled={buttonDisabled}>
                        Send
                    </Button>

                    
            </div>
            <p className="message">{message && message}</p>
        </form>
    </Card>
  )
}

export default FeedbackForm
