/* eslint-disable react/prop-types */
import React from 'react';
import Styles from './index.module.css';
import axios from 'axios';

const { loginContainer,formContainer,loginHeader,labelemail,
        labelPassword,footerContainer,inputContainerEmail,
        inputContainerPassword,inputtext,
        btn2h1,submitData, displayError} = Styles;

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            token: '',
            fullName: '',
            confirmedBookings:[],
            loginError: ''
        }
    }
    
    handleChange = (e) => {

        const {value} = e.target;
        this.setState({[e.target.name]:value});

    }

    handleFormSubmission = async (event) => {

        event.preventDefault();
        const userInfo = {
            email: this.state.email,
            password: this.state.password,
        };
       await axios.post('http://api-staging.joinbubble.co.uk/auth/local', userInfo)
                        .then(response=>{
            const tokenInfo = response.data;
            if(tokenInfo){
                this.setState({
                    token: tokenInfo.token
                })
            }
        })
        .catch(error => {
            const err = 'Invalid Credentials'
            this.setState({
                loginError: err
            })
         })
            
        if(this.state.token) {
            const token = this.state.token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            const userData = await axios.get('http://api-staging.joinbubble.co.uk/api/user')
                            .then(response=>{
                                if(response.data){
                                    return response.data
                                }
                            })
            if(userData) {
                await axios.get('http://api-staging.joinbubble.co.uk/api/booking/activesummary')
                .then(response=>{
                    const bookingData = response.data.confirmedBookings;
                    this.props.history.push({
                        pathname: '/user',
                        token: this.state.token,
                        userData,
                        bookingData
                    });
                })
            }
            
        }
            
    }

    render() {
        return(
            <div className={loginContainer}>
                <form className={formContainer}
                        autoComplete="off"
                        onSubmit={this.handleFormSubmission}
                >   
                    <div className={loginHeader}>
                        <h1>Enter your Login Details</h1>
                    </div>
                    <div className={inputContainerEmail}>
                        <label
                            className={labelemail}
                            htmlFor="email"
                        >
                            Email
                        </label><br />
                        <input
                            className={inputtext}
                            type="text"
                            value={this.state.email}
                            name="email"
                            placeholder="email"
                            autoComplete="off"
                            onChange={(e)=>{

                                this.handleChange(e);

                            }}
                            onBlur ={this.validateemail}
                        />
                    </div>
                    <div className={inputContainerPassword}>
                        <label
                            className={labelPassword}
                            htmlFor="password"
                        >
                            Password
                        </label><br />
                        <input
                            className={inputtext}
                            type="text"
                            value={this.state.password}
                            name="password"
                            placeholder="password"
                            autoComplete="off"
                            onChange={(e)=>{

                                this.handleChange(e);

                            }}
                            onBlur ={this.validatePassword}
                        />
                    </div>
                    <div className={footerContainer}>
                        <button
                            type="button"
                            className={submitData}
                            onClick={this.handleFormSubmission}
                        >
                            <span className={btn2h1}>Submit</span><br />
                        </button>
                        <span className={displayError}>{this.state.loginError}</span>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;
