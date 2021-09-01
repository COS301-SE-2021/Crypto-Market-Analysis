import React, {useContext} from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../Auth/Auth"

export default function PrivateRoute({ component: Component, ...rest }) {
    /*const { currentUser } = useContext(useAuth);*/
    const currentUser = null;
    return (
        <Route
            {...rest}
                render={props => {
                    return currentUser ? (<Component {...props} /> ) : ( <Redirect to="/login" /> )
                }
            }
        />
    );
};