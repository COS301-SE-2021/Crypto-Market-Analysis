/*eslint-disable*/
import React, { useState, useRef, useEffect}  from "react";
import { Link, useHistory } from "react-router-dom";
import {Avatar} from "@material-ui/core";

import "./Sidebar.css";
import ModalComp from "../Modal/Modal";


export default function Sidebar() {

  const unblockHandle = useRef()
  const history = useHistory()
  const [collapseShow, setCollapseShow] = React.useState("hidden")
  const [show, setShow] = useState(false)
  let   [linkDisable, setLinkDisable] = useState({})
  const  user = localStorage.getItem("emailSession")
  let  cryptoReq = {
    email: localStorage.getItem("emailSession")
  }
    
    useEffect(()=>{
      
      if(user != null){
        setLinkDisable(false)
      }
      else{
        setLinkDisable(true)
      }
    },[])
  
    const changeLocation = ()=>{
      
      unblockHandle.current = history.block(() => {
        if(user){
          OnContinue();
          return true;
        }
        else{
          console.log("TRiggered")
          handleShowModal();
          return false;
        }
        
      });
    }
  
    const handleShowModal =()=>{
      setShow(true);
    }

    const onCancel =(e)=>{
      setShow(false);
      
    }

    const OnContinue =()=>{

      if (unblockHandle) {
        unblockHandle.current()
      }
      history.push('/login')
    }

  return (
  
    <>
      <ModalComp show={show} cancel={onCancel} continue={OnContinue} />
       
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
      >
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}

          <div>
            <div style={{
              position:"static",
              display:"flex",
              justifyContent:"space-between",
              margin:"10px 0px",
              borderBottom: "1px solid grey"
            }}>
                <div>
                  <Avatar style={{width: "20px", height: "20px", borderRadius: "80px" }} className="aV" src='https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg'
                  />
                </div>

                <div style={{display:"flex",justifyContent:"space-around", width: "-50%", position:"static"}}>
                    <p className={"w"}>{cryptoReq.email}</p>
                </div>

            </div>
          </div>




          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"/>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold  p-4 px-0"
            to="/"
          >
            Cryptosis
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              {/* <NotificationDropdown /> */}
            </li>
            <li className="inline-block relative">
              {/* <UserDropdown /> */}
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none  absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
            
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    Notus React
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"/>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              User Layout Pages
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/home") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/home"
                  onClick={changeLocation}
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (window.location.href.indexOf("/home") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  />{" "}
                  Dashboard
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/Settings") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/Settings"
                  onClick={changeLocation}
                >
                  <i
                    className={
                      "fas fa-tools mr-2 text-sm " +
                      (window.location.href.indexOf("/Settings") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  />{" "}
                  Settings
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/profile") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/profile"
                  onClick={changeLocation}
                >
                  <i
                    className={
                      "fas fa-user mr-2 text-sm " +
                      (window.location.href.indexOf("/profile") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  />{" "}
                  Profile
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/Notifications") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/Notifications"
                  onClick={changeLocation}
                >
                  <i
                    className={
                      "fas fa-bell mr-2 text-sm " +
                      (window.location.href.indexOf("/Notifications") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  />{" "}
                  Notifications
                </Link>
              </li>
              <li className="items-center">
                {linkDisable ? <Link onClick={(event) => event.preventDefault()}
                  className={
                    "text-xs uppercase py-3 font-bold block disable " +
                    (window.location.href.indexOf("/") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/"

                >
                  <i
                    className={
                      "fas fa-sign-out-alt mr-2 text-sm " +
                      (window.location.href.indexOf("/") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  />{" "}
                  Logout
                </Link> 
                :<Link onClick={()=> localStorage.clear()}
                  className={
                    "text-xs uppercase py-3 font-bold block  " +
                    (window.location.href.indexOf("/login") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/login"

                >
                  <i
                    className={
                      "fas fa-sign-out-alt mr-2 text-sm " +
                      (window.location.href.indexOf("/login") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Logout
                </Link>}
              </li>
            </ul>
            <hr className="my-4 md:min-w-full" />
          </div>
        </div>
      </nav>
    </>
  );
}
