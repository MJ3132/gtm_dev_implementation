import React from 'react';
import './Button.styles.scss';



const Button = (props) => (

    <div className="button_container">
        <button className="cta_button" disabled={props.disabled} onClick={props.clickAction} >
            {props.children}
        </button>
    </div>
)

export default Button;