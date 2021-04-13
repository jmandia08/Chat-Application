import React from 'react'

const Button = ({onClick=null,children=null}) => {
    return(
        <>
        <div className="google-btn">
        <div className="google-icon-wrapper">
            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
         </div>
            <p className="btn-text" onClick={onClick}><b>{children}</b></p>
        </div>
        </>
    )
    };

export default Button

