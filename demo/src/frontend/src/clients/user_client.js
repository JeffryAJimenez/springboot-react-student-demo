import fetch from 'unfetch';
import {checkStatus} from '../utils/checkStatus';
import { useAuth0 } from '@auth0/auth0-react';
import { catchClause } from '@babel/types';


export const getAllUsers = () =>
    fetch("api/v1/users")
        .then( checkStatus );

export const updateUsers = ( token ) => {
    
   
        // console.log("TOKEN IS: " + token)
        fetch("api/v1/users", {
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${token}`,
            },
            method: 'POST',
            body: JSON.stringify({})
        }).then ( checkStatus );


   
}


// export const updateUsers = () =>
//     fetch("api/v1/users/update").then ( checkStatus );

 