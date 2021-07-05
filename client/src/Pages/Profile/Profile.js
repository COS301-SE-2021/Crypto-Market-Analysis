import React from 'react'

const Profile = () => {
    return(
        <div>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                border: "1px solid gray"
            }}>
                <div>
                    <img style={{width: "160px", height: "160px", borderRadius: 80px }}
                    src="https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg"
                    />
                </div>
                <div>
                    <h4>UserName</h4>
                    <div style={{dispaly:"flex",justifyContent:"space-between", width: "108%"}}>
                        <h5>Follows 2 cryptos</h5>
                        <h5>Follows 3 social media sites</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}
