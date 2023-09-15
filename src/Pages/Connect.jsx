import React from "react";

function Connect() {
    const showconnectclose=()=>{
        localStorage.removeItem("showconnect")
    }
  return (
    <div>
      <div onClick={showconnectclose}>close</div>
      <div>Connect</div>
    </div>
  );
}

export default Connect;
