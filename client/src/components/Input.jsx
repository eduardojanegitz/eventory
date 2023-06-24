import React from "react";

const Input = ({user}) => {
 return (
    <div>
        <input type="text" value={user.name}/>
    </div>
 )
}

export default Input;