import React, { useRef, useState } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../Auth/Auth"
import { Link, useHistory } from "react-router-dom"
import "./login.css"

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, currentUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            localStorage.setItem('emailSession',emailRef.current.value);
            history.push("/home")
        } catch(err)
        {
            setError("Failed to login!")
        }

        setLoading(false)
    }

    return (
        <React.Fragment>
        <div className="content-cover">
            <div className="row" >
                <div className="col-md-12 mx-auto p-0" >
                    <img src={"/cryptosis2-t.png"} alt="cryptosis logo" style={{margin:"auto"}} />
                </div>
                <div className="col-md-4 mx-auto p-0">
                    <div className="card shadow-lg">
                        <div className="card-header text-center">Login</div>
                        <div className="card-body">
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                            
                                <Form.Group id="email">
                                    <div style={{width:"70%",margin:"auto"}}>
                                        <Form.Label className="label">Email</Form.Label>
                                    </div>
                                    <Form.Control type="email" ref={emailRef} style={{width:"70%",margin:"auto"}} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <div style={{width:"70%",margin:"auto"}}>
                                        <Form.Label className="label">Password</Form.Label>
                                    </div>
                                    <Form.Control type="password" ref={passwordRef} style={{width:"70%",margin:"auto"}} required />
                                </Form.Group>
                                <div className="text-right mt-2 mb-2" style={{width:"70%",margin:"auto"}}>
                                    <Link to="/updatePassword" className="label">Forgot Password?</Link>
                                </div>
                                <Form.Group className="text-center">
                                    <Button disabled={loading} style={{width:"70%",margin:"auto"}} type="submit">
                                        Sign In
                                    </Button>
                                </Form.Group>
                                <div className="mt-2 new" style={{width:"70%",margin:"auto"}}>
                                    New to Cryptosis? <Link to="/register" className="label">Register here</Link>
                                </div>
                            </Form>
                        
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
            </React.Fragment>
    )
}