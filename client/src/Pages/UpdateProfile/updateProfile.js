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
        <React.Fragment>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                ref={email}
                                required
                                defaultValue={currentUser.email}
                            />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                ref={password}
                                placeholder="Do not enter to keep same"
                            />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordConfirm}
                                placeholder="Do not enter to keep same"
                            />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            <Link to="/Profile">Update</Link>
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/Profile">Abort</Link>
            </div>
        </React.Fragment>
    )
}