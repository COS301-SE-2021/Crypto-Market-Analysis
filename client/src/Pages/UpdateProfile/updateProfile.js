import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../Auth/Auth"
import { Link, useHistory } from "react-router-dom"

export default function UpdateProfile() {
    const email = useRef()
    const password = useRef()
    const passwordConfirm = useRef()
    const {currentUser, updatePassword, updateEmail} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        if (password.current.value !== passwordConfirm.current.value) {
            return setError("Password Are not the same!")
        }

        const promises = []
        setLoading(true)
        setError("")

        if (email.current.value !== currentUser.email) {
            promises.push(updateEmail(email.current.value))
        }
        if (password.current.value) {
            promises.push(updatePassword(password.current.value))
        }

        Promise.all(promises)
            .then(() => {
                history.push("/")
            })
            .catch(() => {
                setError("Failed to update account")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
        
            <div className="row">
               
                <div className="col-md-4 mx-auto mt-5 p-0">
                    <div className="card shadow-lg">
                        <div className="card-header ">
                            Update Profile
                            <Link to="/Profile" className="float-right text-blueGray-700"><i class="fas fa-times"></i></Link>
                        </div>
                        <div className="card-body">
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <div style={{width:"70%",margin:"auto"}}>
                                        <Form.Label className="label">Email</Form.Label>
                                    </div>
                                    <Form.Control
                                        type="email"
                                        ref={email}
                                        required
                                        defaultValue={currentUser.email}
                                        style={{width:"70%",margin:"auto"}}
                                    />
                                </Form.Group>
                                <Form.Group id="password">
                                    <div style={{width:"70%",margin:"auto"}}>
                                        <Form.Label className="label">Password</Form.Label>
                                    </div>
                                    <Form.Control
                                        type="password"
                                        ref={password}
                                        style={{width:"70%",margin:"auto"}}
                                    />
                                    <div className="text-right" style={{width:"70%",margin:"auto"}}>
                                        <span className="label">Do not enter to keep same</span>
                                    </div>
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <div style={{width:"70%",margin:"auto"}}>
                                        <Form.Label className="label">Password Confirmation</Form.Label>
                                    </div>
                                    <Form.Control
                                        type="password"
                                        ref={passwordConfirm}
                                        style={{width:"70%",margin:"auto"}}
                                    />
                                    <div className="text-right" style={{width:"70%",margin:"auto"}}>
                                        <span className="label">Do not enter to keep same</span>
                                    </div>
                                </Form.Group>
                                <Form.Group className="text-center">
                                    <Button disabled={loading} style={{width:"70%",margin:"auto"}} type="submit">
                                    <Link to="/Profile" style={{color:"white"}}>Update</Link>
                                    </Button>
                                </Form.Group>
                            </Form>
                        
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </>
    )
}