import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../Auth/Auth"
import { Link, useHistory } from "react-router-dom"
export default function UpdatePassword() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { resetPassword, currentUser } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            history.push("/home")
            setMessage('Reset Message delivered to Email')
        } catch {
            setError("Failed to reset password enter valid details!")
        }

        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Reset Password</h2>

                                {error && <Alert variant="danger">{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" ref={emailRef} required />
                                    </Form.Group>
                                    <Button disabled={loading} className="w-100" type="submit">
                                        ResetPassword
                                    </Button>
                                </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/login">Login!</Link>
            </div>
            <div className="w-100 text-center mt-2">
                New user? <Link to="/register">Register new Account!</Link>
            </div>
        </>
    )
}