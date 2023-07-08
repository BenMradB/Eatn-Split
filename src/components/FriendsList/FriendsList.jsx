import React from 'react'
import styles from './FriendsList.module.css'
import { useFriends } from '../../context/FriendsProvider'
import FriendItem from '../FriendItem/FriendItem';

const FriendsList = ({ selectedFriend, selectFriendHandler }) => {
    const { friends } = useFriends();
    return (
        <ul className={styles.friendsList}>
            {
                friends.map((friend, i) => <FriendItem key={i} friend={friend} selectedFriend={selectedFriend} selectFriendHandler={selectFriendHandler} />)
            }
        </ul>
    )
}

export default FriendsList