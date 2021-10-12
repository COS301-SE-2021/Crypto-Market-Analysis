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
            <div className="content-cover" style={{fontFamily: 'Nunito'}}>
                <div className="row">
                    <div className="col-md-4 mx-auto p-0 mt-5">
                        <div className="card shadow-lg">
                            <div className="card-header text-center">Update Profile</div>
                                <div className="card-body">
                                    {error && <Alert variant="danger">{error}</Alert>}
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group id="email">
                                                <Form.Label>
                                                    Email
                                                </Form.Label>
                                                <Form.Control
                                                        type="email"
                                                        ref={email}
                                                        required
                                                        defaultValue={currentUser.email}
                                                />
                                            </Form.Group>
                                            <Form.Group id="password">
                                                <Form.Label>
                                                    Password
                                                </Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    ref={password}
                                                    placeholder="Do not enter to keep same"
                                                />
                                            </Form.Group>
                                            <Form.Group id="password-confirm">
                                                <Form.Label>
                                                    Password Confirmation
                                                </Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    ref={passwordConfirm}
                                                    placeholder="Do not enter to keep same"
                                                />
                                            </Form.Group>
                                            <Button href="/Profile" disabled={loading} className="w-100" type="submit">
                                                Update
                                            </Button>


                                        </Form>
                                    <div className="w-100 text-center mt-2">
                                        <Button href="/Profile" disabled={loading} className="w-100" type="submit">
                                            Abort
                                        </Button>
                                    </div>

                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}