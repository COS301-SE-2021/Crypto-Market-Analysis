import React, { useState, useEffect}  from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalComp(props) {

    let [show, setShow] = useState(props.show)
   
    useEffect(()=>{
        setShow(props.show)
       
      },[props.show])
      
    return(
        <React.Fragment>
        <Modal show={show} style={{textAlign:"center"}}>
            <Modal.Body >
           
            {
                props.text != null ? <React.Fragment>
                        <h4>Wait</h4>
                        <p>{props.text}</p> 
                    </React.Fragment>:<React.Fragment>
                        <h4>Oops</h4>
                        <p>Looks like you're not logged in. Please log in to access to more features</p>
                    </React.Fragment>
            }
            
            </Modal.Body>
            <Modal.Footer className="justify-center" >
                <button onClick={props.cancel} className="btn text-xs uppercase" style={{backgroundColor:"#03989e",fontWeight:"bold"}}>Cancel</button>
                <button onClick={props.continue} className="btn text-xs uppercase" style={{backgroundColor:"#03989e",fontWeight:"bold"}}>{props.text != null ? <React.Fragment>Delete</React.Fragment> : <React.Fragment>Login</React.Fragment>}</button>
            </Modal.Footer>
        </Modal>
        </React.Fragment>
    )
}