import React, { useState } from 'react';
import { AddFriendForm, BillForm, Box, Button, FriendsList } from './components';
import './App.css'
import { FriendsProvider, useFriends } from './context/FriendsProvider';

const App = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [openAddFriendForm, setOpenAddFriendForm] = useState(false);

  const selectFriendHandler = (friend) => {
    setSelectedFriend((curr) => curr && curr?.id === friend.id ? null : friend)
  }

  const openAddFriendFormHandler = () => setOpenAddFriendForm(curr => !curr)

  return (
    <div className='app'>
      <FriendsProvider>
        <Box>
          <FriendsList selectedFriend={selectedFriend} selectFriendHandler={selectFriendHandler} />
          {openAddFriendForm && <AddFriendForm />}
          <Button type='add' onClick={openAddFriendFormHandler}>
            {openAddFriendForm ? 'Close' : 'Add friend'}
          </Button>
        </Box>
        {selectedFriend &&
          <Box>
            <BillForm key={selectedFriend?.id} selectedFriend={selectedFriend} />
          </Box>
        }
      </FriendsProvider>
    </div>
  )
}

export default App