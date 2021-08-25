import React, { useRef, useState } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../Auth/Auth"
import { Link, useHistory } from "react-router-dom"
import { db } from '../../firebase'
export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Password Not the same!")
        }

        try {
            let sst = ["Reddit","Twitter","Medium"]
            let arr = ["SatoshiStreetBets", "CryptoCurrencyTrading", "CryptoCurrencies"]
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            await db.collection('Users').doc(emailRef.current.value).set({
                user_id: emailRef.current.value,
                social_media_sites: sst,
                subreddits: arr
            });
            localStorage.setItem('emailSession',emailRef.current.value);

            history.push("/home")
        } catch {
            setError("Email address already exists")
        }

        setLoading(false)
    }

    return (
        
        <body>
        <div className="row">
            <div className="col-md-4 mx-auto p-0">
                <div className="card shadow-lg">
                    <div className="card-header text-center">Sign Up</div>
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
                            <Form.Group id="password-confirm">
                                <div style={{width:"70%",margin:"auto"}}>
                                    <Form.Label className="label">Password Confirmation</Form.Label>
                                </div>
                                <Form.Control type="password" ref={passwordConfirmRef} style={{width:"70%",margin:"auto"}} required />
                            </Form.Group>
                            <Form.Group className="text-center">
                                <Button disabled={loading} style={{width:"70%",margin:"auto"}} type="submit">
                                    Register
                                </Button>
                            </Form.Group>
                            <div className="mt-2 new" style={{width:"70%",margin:"auto"}}>
                                Already have an Account? <Link to="/login" className="label">Log In</Link>
                            </div>
                        </Form>
                       
                    </div>
                </div>
                
            </div>
        </div>
            
            
        </body>
    )
}