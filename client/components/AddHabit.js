import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddHabit = () => {

    const addNewHabit = () => {
        const { habitName} = newHabit
        newHabit.habitName = 'cooking';
       
            axios.post("http://localhost:3000/addhabit", newHabit)
            .then( res => {
                console.log('res from backend',res)
            })
       
        
    }

    return (
        <div>
            <h1>In React AddHabit.js</h1>
            <div>{addNewHabit}</div>
        </div>
    )
}

export default AddHabit;