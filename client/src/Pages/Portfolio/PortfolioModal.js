import React, {useState} from 'react';
import "./Modal.css"
import Button from "@material-ui/core/Button";

export default function PortfolioModal() {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    return(
        <React.Fragment>
        <Button variant={'contained'} style={{
            textAlign: "center",
            backgroundColor: "blue",
            color:"#FFFFF0",
            padding: "5px 15px",
            borderRadius: "5px",
            outline: "5px",
            width: "40%",
        }} onClick={toggleModal} className={'btn-modal'}>
           Create portfolio
        </Button>

            <div className= "modal">
                <div className="overlay">

                </div>
                <div className= "modal-content">
                    <h2>
                        hello
                    </h2>
                    <p>
                        eita jhbsdjhh akjbasn  khabdjh
                    </p>
                    <button className="close" onClick={toggleModal}>
                        CLOSE
                    </button>
                </div>
            </div>

        </React.Fragment>
    )
}