
import { useState } from 'react';
import {
    Form,
    FormGroup,
    Input,
    Button,
  } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../Header';
import { useMutation } from '@tanstack/react-query';
import { LoginInfo } from '../../types';
import { useStateContext } from '../../context';
import { loginUserFn } from '../../api';
import Spinner from '../Spinner';

import './index.css';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const [validEmail, setValidEmail] = useState<string>('has-success');
    const [validPassword, setValidPassword] = useState<string>('has-success');
    const stateContext = useStateContext();

    const { mutate: loginUser, isLoading } = useMutation(
        (loginInfo: LoginInfo) => loginUserFn(loginInfo),
        {
          onSuccess: (data) => {
            data.password = password;
            data.authStatus = "AUTH";
            stateContext.dispatch({ type: 'SET_USER', payload: data });
            navigate('/dashboard');
            toast.success('You have successfully signed in');
          },
          onError(error: any) {
            if (Array.isArray((error as any).data.error)) {
              (error as any).data.error.forEach((el: any) =>
                toast.error(el.message, {
                  position: 'top-right',
                })
              );
            } else {
              toast.error((error as any).data.message, {
                position: 'top-right',
              });
            }
          },
        }
    );

    const validateEmail = () => {
        const emailRex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validatedEmail: string = validEmail;

        if (email.length > 0) {
            if (emailRex.test(email)) {
                if (validEmail === 'has-danger') {
                    validatedEmail = 'has-success'; 
                }
            } else if (validEmail === 'has-success') {
                validatedEmail = 'has-danger';  
            }
        } else if (validEmail === 'has-success') {
            validatedEmail = 'has-danger';  
        }
        return validatedEmail;
    }

    const validatePassword = () => {
        let validatedPassword = validPassword;
        if (password.length < 5) {
            if (validPassword === 'has-success') {
                validatedPassword = 'has-danger';  
            }
        } else if (validPassword === 'has-danger') {
            validatedPassword = 'has-success';
        }
        return validatedPassword;
    }

    const validateUser = (event: any) => {
        event.preventDefault();

        const validatedEmail = validateEmail();
        const validatedPassword = validatePassword();
        setValidEmail(validatedEmail);
        setValidPassword(validatedPassword);
        if (validatedEmail === 'has-success' &&
            validatedPassword === 'has-success') {
            loginUser({email: email, password: password});
        }
    }

    if (isLoading) {
        return <Spinner/>;
    }

    return (
        <>
        <Header />
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <Form onSubmit={validateUser} name="login" method="POST" className="login100-form p-l-55 p-r-55 p-t-140">
                        <span className="login100-form-title">
                        Sign In
                        </span>
                        <FormGroup className="form-group">
                            <div className="wrap-input100 m-b-16">
                                <Input
                                    className="input100"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    valid={ validEmail === 'has-success' }
                                    invalid={ validEmail === 'has-danger' }
                                    onChange={e => setEmail(e.target.value)}
                                    />
                                <span className="focus-input100"></span>
                            </div>
                            { validEmail === 'has-danger' && (
                                <span className="text-danger">Please enter a valid email address.</span>
                            )}
                        </FormGroup>
                        <FormGroup className="form-group">
                            <div className="wrap-input100">
                                <Input
                                    className="input100"
                                    type="password"
                                    name="password"
                                    placeholder="Password" 
                                    valid={ validPassword === 'has-success' }
                                    invalid={ validPassword === 'has-danger' }
                                    id="password" 
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    />
                                <span className="focus-input100"></span>
                            </div>
                            { validPassword === 'has-danger' && (
                                <span className="text-danger">Your password must have at least 5 characters.</span>
                            )}
                        </FormGroup>
                        <div className="text-right p-t-13 p-b-23">
                            <span className="txt2">
                                Forgot&nbsp;
                            </span>
                            <Link className="txt2" to='/reset'>Password?</Link>
                        </div>
                        <input name="_csrf" type="hidden" value="10887b51-b4c5-420f-b535-62d762014f9d" />
                        <div className="container-login100-form-btn">
                            <Button className="login100-form-btn" type="submit">
                                Sign in
                            </Button>
                        </div>

                        <div className="flex-col-c p-t-40 p-b-20">
                            <span className="txt2 p-b-9">
                                Don’t have an account?
                            </span>
                            <Link className="txt2" to='/signup'>Sign up now</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
        </>
    )

}

export default Login;