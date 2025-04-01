import React from 'react'

const Header = ({text="Review App",bgColor="blue",textColor="#ffffff"}) => {

    // console.log(props);
    const headerStyle = {
        backgroundColor:bgColor,
        color:textColor
    }

  return (
     <header style={headerStyle}>
        <div className='container'>
            <h1>{text}</h1>
        </div>
     </header>
  )
}


export default Header