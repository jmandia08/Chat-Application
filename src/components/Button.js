import React from 'react'

const Button = ({onClick=null,children=null}) => {
    return(
        <>
        <div class="google-btn">
        <div class="google-icon-wrapper">
            <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
         </div>
            <p class="btn-text" onClick={onClick}><b>{children}</b></p>
        </div>
        </>
    )
    };

export default Button

