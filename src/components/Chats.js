// import React from 'react';
// import { auth } from '../firebase';
// import { ChatEngine } from 'react-chat-engine';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// // Components
// import Navbar from './Navbar';

// // Styles
// import styles from "./Chats.module.css"


// const Chats = () => {

//     const history = useHistory();

//     const logoutHandler = async () => {

//         await auth.signOut();
//         history.push("/")
//     }

//     return (
//         <div className={styles.container}>
//             <Navbar LogoutHandler={logoutHandler} />

//             <C />

//         </div>
//     );
// }

// export default Chats;

import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from "react-chat-engine";
import axios from 'axios';

// Components
import Navbar from './Navbar';

// Styles
import styles from "./Chats.module.css"

// Context
import { AuthContext } from "../contexts/AuthContextProvider";

const Chats = () => {

    const [loading, setLoading] = useState(true);
    const user = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if(!user) {
            history.push("/");
            return;
        }

        axios.get("https://api.chatengine.io/users/me", {
            headers: {
                "project-id": "c76b1138-1b35-4092-b0a9-9144cc864d15",
                "user-name": user.email,
                "user-secret": user.uid
            }
        })
        .then(() => {
            setLoading(false)
        })
        .catch(() => {
            let formData = new FormData();
            formData.append("email", user.email);
            formData.append("username", user.email);
            formData.append("secret", user.uid);
            getFile(user.photoURL)
                .then(avatar => {
                    formData.append("avatar", avatar, avatar.name)
                    axios.post("https://api.chatengine.io/users/", formData, {
                        headers: {
                            "private-key": "214084e1-ffc3-4d6a-81a7-61c153c076c7"
                        }
                    })
                    .then(() => setLoading(false))
                    .catch(error => console.log(error))
                    
                })
        })

    }, [user, history])

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], "userPhoto.jpg", {type: "image/jpeg"})
    }

    const logoutHandler = async () => {
        await auth.signOut();
        history.push("/")
    }

    if (!user || loading) return "Loading..."

    return (
        <div className={styles.container}>
            <Navbar logoutHandler={logoutHandler} />

            <ChatEngine
                height="calc(100vh - 50px)"
                projectID="8e908be0-edec-485a-b753-5d201ca7903b"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;