import React, { useState } from 'react'
import styles from './AddFriendForm.module.css'
import Button from '../Button/Button';
import { useFriends } from '../../context/FriendsProvider';

const AddFriendForm = () => {
    const { dispatch } = useFriends();
    const [name, setName] = useState('');
    const [image, setImage] = useState('https://i.pravatar.cc/48')

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !image) return;
        const id = crypto.randomUUID();
        const newFriend = {
            id,
            name,
            image: `${image}?u=${id}`,
            balance: 0
        }

        dispatch({ type: 'friends/add', payload: newFriend });
        setName('')
        setImage('https://i.pravatar.cc/48')
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">🧔Friend Name</label>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="image">🖼️ Friend Image</label>
                <input id='image' type="text" value={image} onChange={(e) => setImage(e.target.value)} />
            </div>

            <Button type='addFriend'>Add</Button>
        </form>
    )
}

export default AddFriendForm