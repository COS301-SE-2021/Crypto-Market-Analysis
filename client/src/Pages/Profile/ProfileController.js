import React, {useEffect, useState} from "react";
import axios from "axios";
import ProfileView from './ProfileView'
import SidebarController from "../../components/Sidebar/SidebarController";

const ProfileController = () => {

    //ProfileView Model
    let[socs,setSoc] =useState([]);
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [userToSearch, setUserToSearch] = useState({})
    let[crypts, setCrypt] = useState([]);

    //ProfileView Controller
    const handleChange = (event, newValue) =>
    {
        setSelectedTab(newValue);
    }

    let  userReq = {
        email: localStorage.getItem("emailSession")
    }
    useEffect(async () => {

        axios.post('http://localhost:8080/user/getUserCryptos/',userReq)
            .then( response => {
                let soc = [];
                for(const crypto of response.data)
                    soc.push({socName: crypto});
                setSoc(soc);
            })
            .catch(err => {console.error(err);})

        axios.post('http://localhost:8080/user/fetchUserSocialMedia/',userReq)
            .then(response => {
                let socialName = [];
                for(const platform of response.data)
                    socialName.push({socMediaName: platform});
                setCrypt(socialName);
            })
            .catch(err => {console.error(err);})

    },[])

    const handleFollow = (user)=> {
        window.twttr.widgets.createFollowButton(
            userToSearch,
            document.getElementById('followBtn'),
            {
                size: 'large'
            }
        )
    }

    const followUser = () => {
        let user = {email: localStorage.getItem("emailSession"), screen_name: userToSearch }
        axios.post('http://localhost:8080/twitter/follow/',user)
            .then(response=>{
                console.log(response)
            })
            .catch(err => {console.error(err)})

    }

    const searchInput = (event) => {
        setUserToSearch(event.target.value)
    }

    const searchUsername = async () =>{

        let user = { screen_name: userToSearch }
        axios.post('http://localhost:8080/twitter/validateScreenName/',user)
            .then(()=>{
                handleFollow(userToSearch)
            })
            .catch(err => {console.error(err)})
    }

    return(
        <ProfileView
            handleChange = {handleChange}
        handleFollow = {handleFollow}
        followUser = {followUser}
        searchInput = {searchInput}
        searchUsername = {searchUsername}
        />
    );
}
export default ProfileController;