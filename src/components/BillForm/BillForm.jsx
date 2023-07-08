import React, { useReducer } from 'react'
import styles from './BillForm.module.css'
import Button from '../Button/Button'
import { useFriends } from '../../context/FriendsProvider'

const initialState = {
    billValue: '',
    yourExpense: '',
    whoIsPaying: 'you'
}

const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'bill/value': return {
            ...state,
            billValue: payload
        };
        case 'bill/yourExpense': return {
            ...state,
            yourExpense: payload
        };
        case 'bill/whoIsPaying': return {
            ...state,
            whoIsPaying: payload
        };
        case 'bill/reset': return initialState;
        default: throw new Error(`Unknown type : ${type}`);
    }
}

const BillForm = ({ selectedFriend: { id, name, balance } }) => {
    const { dispatch } = useFriends();
    const [billState, billDispatch] = useReducer(reducer, initialState);
    const { billValue, yourExpense, whoIsPaying } = billState;
    const friendExpense = billValue - yourExpense;

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (!billValue || !yourExpense) return;

        balance = whoIsPaying === 'you' ? friendExpense : -yourExpense;

        dispatch({ type: 'friends/bill/split', payload: { id, balance } });
        billDispatch({ type: 'bill/reset' });
    }

    return (
        <form className={styles.form} onSubmit={onSubmitHandler}>
            <h1>Split a bill with <span>{name}</span></h1>

            <div>
                <label htmlFor="bill"> 💰 Bill value </label>
                <input type="text" id='bill' value={billValue} onChange={(e) => billDispatch({ type: 'bill/value', payload: +e.target.value })} />
            </div>
            <div>
                <label htmlFor="your" > 🧔 Your Expense </label>
                <input type="text" id='bill' value={yourExpense} onChange={(e) => billDispatch({ type: 'bill/yourExpense', payload: +e.target.value })} />
            </div>
            <div>
                <label htmlFor="bill"> 🧑‍🤝‍🧑 {name} 's Expense </label>
                <input type="text" id='your' readOnly style={{ background: '#80808024' }} value={friendExpense} />
            </div>
            <div>
                <label htmlFor="who"> 🤑 Who is paying the bill  </label>
                <select name="" id="who" value={whoIsPaying} onChange={(e) => billDispatch({ type: 'bill/whoIsPaying', payload: e.target.value })}>
                    <option value="you">You</option>
                    <option value="friend">{name}</option>
                </select>
            </div>

            <Button>Split Bill</Button>
        </form>
    )
}

export default BillForm