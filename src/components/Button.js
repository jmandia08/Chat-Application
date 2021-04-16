import React from 'react'
import classnames from 'classnames';

const Button = ({onClick=null,children=null,loginType=""}) => {
    return(
        <div className="buttons" onClick={onClick}>
            <div className={classnames("google-btn", children.replace( /\s/g, '')).concat('-btn')}>
                <div className={classnames('google-icon-wrapper', children.replace( /\s/g, '')).concat('-wrapper')}>
                    <img className={classnames('google-icon', children.replace( /\s/g, '')).concat('-icon')} 
                    alt={loginType} 
                    src={
                        children === "Sign Out"? "https://cdn2.iconfinder.com/data/icons/picons-essentials/57/logout-512.png" :
                        (loginType === "twitter" ? "https://www.lter-europe.net/document-archive/image-gallery/albums/logos/TwitterLogo_55acee.png/image"
                        : "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg")
                    }
                    />
                </div>
                <p className={classnames('btn-text', children.replace( /\s/g, '')).concat('-text')}><b>{ children === "Sign Out"? "" : children}</b></p>
            </div>
        </div>
    )
    };

export default Button

