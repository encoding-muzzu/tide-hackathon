import React from 'react'

const Loader = () => {
    return (
        // <div id="global-loader" style={{border:'1px solid black',backgroundColor:"rgba(39, 39, 39, 0.726)"}}>
        //     <img src={require("../../assets/img/loader.svg").default} className="loader-img" alt="Loader" />
        // </div>
        <div className="text-center main-loader">
        <div className="lds-dual-ring"></div>
      </div>
    )
}

export default Loader;