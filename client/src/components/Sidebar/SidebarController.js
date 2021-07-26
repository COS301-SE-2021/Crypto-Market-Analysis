import React, { useState,useRef}  from "react";
import SidebarView  from './SidebarView';
import {useHistory} from "react-router-dom";

const SidebarController = () => {
    //Sidebar Model
    const  user = localStorage.getItem("emailSession")
    const [show, setShow] = useState(false);
    const unblockHandle = useRef();
    const history = useHistory()

    //Sidebar Controller
    function handleShowModal () {
        setShow(true);
    }

    function onCancel (e) {
        setShow(false);

    }

    function changeLocation () {
        unblockHandle.current = history.block(() => {
            if(user){
                OnContinue();
                return true;
            }
            else{
                handleShowModal();
                return false;
            }
        });
    }

    function OnContinue () {
        if (unblockHandle) {
            unblockHandle.current()
        }
        history.push('/login')
    }

    return(
        <SidebarView
        OnContinue = {OnContinue}
        onCancel = {onCancel}
        changeLocation = {changeLocation}
        handleShowModal = {handleShowModal}
        />
    );
};

export default SidebarController;
