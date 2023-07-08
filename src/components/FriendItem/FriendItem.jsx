import React from 'react'
import styles from './FriendItem.module.css'
import Button from '../Button/Button'
import { useFriends } from '../../context/FriendsProvider'

const FriendItem = ({ friend, selectedFriend, selectFriendHandler }) => {
    return (
        <li className={styles.friend}>
            <div className={styles.left}>
                <img src={`${friend.image}?u=${friend.id}`} alt="profile image" />
                <div>
                    <h2>{friend.name}</h2>
                    {friend.balance < 0 ? <p className={styles.owesYou}> You owe {friend.name} ${Math.abs(friend.balance)} </p> : null}
                    {friend.balance > 0 ? <p className={styles.owesHim}> {friend.name} owes you ${friend.balance} </p> : null}
                    {friend.balance === 0 ? <p> You and {friend.name} are even </p> : null}
                </div>
            </div>
            <Button onClick={() => selectFriendHandler(friend)}>
                {
                    selectedFriend?.id === friend.id ? 'close' : 'select'
                }
            </Button>
        </li>
    )
}

export default FriendItem