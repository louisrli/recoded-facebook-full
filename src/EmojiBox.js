import React, { useState, useEffect } from "react";
import { default_ul, defaultEmoji, emojiArr, container_absolute } from './ReactionStyles';
import Container from "react-bootstrap/Container";
import db from "./firebase";

export const EmojiBox = ({ userId, loggedInUserId }) => {
    const [toggleEmoji, setToggleEmoji] = useState(false);
    const [activeEmoji, setActiveEmoji] = useState();

    useEffect(() => {
        let isMount = true;
        const holder = db.collection('profiles').doc(userId).collection('reactions').doc(loggedInUserId);
        if (holder) {
            holder.onSnapshot(docSnapshot => {
                if (docSnapshot.data()) {
                    setActiveEmoji(docSnapshot.data().emoji)
                } else {
                    setActiveEmoji(defaultEmoji)
                }
            }, err => {
                console.log(`Encountered error: ${err}`);
            });
        }
        return () => isMount = false;
    })
    const handleEmojiClick = (e) => {
        db.collection(`profiles`).doc(userId).collection('reactions').doc(loggedInUserId).set({
            emoji: e.target.innerText
        });
    };

    const emojiMap = () => emojiArr.map((item, idx) =>
        <li key={idx} id={idx} style={{ cursor: 'pointer' }} onClick={handleEmojiClick}>
            <span>{item}</span>
        </li>);

    return <Container style={container_absolute}>
        <span className='reaction_class'>Drop a voodoo chant!</span>
        <Container style={{ textAlign: 'center' }}
            onClick={() => setToggleEmoji(!toggleEmoji)}>
            <span style={{ cursor: 'pointer' }}>{activeEmoji}</span>

            {toggleEmoji &&
                <ul style={default_ul}>
                    {emojiMap()}
                </ul>
            }
        </Container>
    </Container>
}