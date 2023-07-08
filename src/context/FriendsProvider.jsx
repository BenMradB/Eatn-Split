import { createContext, useContext, useReducer } from "react";

const initialState = {
    friends: [
        {
            id: 118836,
            name: "Clark",
            image: "https://i.pravatar.cc/48?u=118836",
            balance: -7,
        },
        {
            id: 933372,
            name: "Sarah",
            image: "https://i.pravatar.cc/48?u=933372",
            balance: 20,
        },
        {
            id: 499476,
            name: "Anthony",
            image: "https://i.pravatar.cc/48?u=499476",
            balance: 0,
        },
    ],
}

const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'friends/add': return {
            ...state,
            friends: [...state.friends, payload]
        };
        case 'friends/bill/split': return {
            ...state,
            friends: state.friends.map(friend => (
                friend.id === payload.id ? { ...friend, balance: friend.balance + payload.balance } : friend
            ))
        }
        default: throw new Error(`Unknown action type : ${type}`)
    }
}

const FriendsContext = createContext();

const FriendsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { friends, selectedFriend } = state;

    return <FriendsContext.Provider value={{
        friends,
        selectedFriend,
        dispatch
    }}>
        {children}
    </FriendsContext.Provider>
}

const useFriends = () => {
    const context = useContext(FriendsContext);
    if (!context) throw new Error('Context used outside a provider');
    return context;
}

export { FriendsProvider, useFriends };