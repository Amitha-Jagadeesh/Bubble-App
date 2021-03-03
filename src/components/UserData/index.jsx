/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import Styles from './index.module.css';

const {
    userinfoConatiner,
    logoutContainer,
    logout,
    displayData
}= Styles

class UserData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.location.token || '',
            username: this.props.location.userData.fullName || '',
            bookingData: this.props.location.bookingData || '',
            babySittersData: ''
        }
    }

    handleClick = async() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.token}`
        const babySittersData = await axios.get('http://api-staging.joinbubble.co.uk/api/search')
                                .then(response=>{
                                    return response.data
                                })
        if(babySittersData) {
            this.setState({
                babySittersData
            })
        }
    }

    handleLogout = async() => {
        this.props.history.push('/');
    }

    render() {
        return(
            <div className={userinfoConatiner}>
                <div className={logoutContainer}>
                    <button className={logout} onClick={this.handleLogout}>Logout</button>
                </div>
                <h1>Welcome {this.state.username}</h1>
                <h2>There are {this.state.bookingData.length} confirmed bookings
                    for Babysitting for your acount</h2>
                <div>
                    {this.state.bookingData.map(booking=>{
                        return(
                            <ul key ={booking.id}>
                                <li>BabysitterName: {booking.otherUserFullName}</li>
                                <li>StartDate: {new Date(booking.scheduledStart).toLocaleDateString()}</li>
                                <li>Duration: {booking.scheduledDuration}hours</li>
                            </ul>
                            
                        )
                    })}
                </div>
                <div>
                    <h2><span className={displayData} onClick={this.handleClick}>
                            Click here
                        </span> to find all the available babysitters.
                    </h2>
                </div>
                <div>
                    {this.state.babySittersData.length > 0
                        && (
                            <div>
                                <h2>There are {this.state.babySittersData.length}
                                    &nbsp;Babysitters available
                                </h2>
                                {this.state.babySittersData.map(babySitter=>{
                                    return(
                                        <div>
                                            <h3>{babySitter.firstName}</h3>
                                            <ul key={babySitter.id}>
                                                <li>FullName: {babySitter.fullName}</li>
                                                <li>DateOfBirth: {new Date(babySitter.dob).toLocaleDateString()}</li>
                                                <li>HourlyRate: {babySitter.hourlyRate}</li>
                                                <li>IdVerified: {babySitter.idVerified.toString()}</li>
                                                <li>BubbleVerified: {babySitter.bubbleVerified.toString()}</li>
                                                <li>Biography: {babySitter.biography.substring(3)}</li>
                                            </ul>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default UserData;