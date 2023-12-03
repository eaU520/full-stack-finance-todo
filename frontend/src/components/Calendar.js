import React from "react";
// import { useState } from 'react';
import '../App.css';
import Navigation from './Navigation';
// import {Link} from 'react-router-dom';

const Calendar = (props) => {
    // var session;
    // const [login, setLogin] = useState();

    
        return (
          <div className="Overview">
            <Navigation/> 
                  <h1 className="display-4 text-center">Calendar</h1>
                  <p className="lead text-center">
                      Upcoming
                  </p>

                  
              </div>

        );
    }
export default Calendar;