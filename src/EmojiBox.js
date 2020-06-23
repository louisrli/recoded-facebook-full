import React, { useState, useEffect } from "react";
import { UlCustom, DEFAULT_EMOJI, EMOJI_ARRAY, ContainerCustom } from './EmojiBox.styles';
import Container from "react-bootstrap/Container";
import db from "./firebase";

export const EmojiBox = ({ userId, loggedInUserId }) => {
    const [toggleEmoji, setToggleEmoji] = useState(false);
    const [activeEmoji, setActiveEmoji] = useState(null);

    useEffect(() => {
        const emojiDocOfSubCol = db.collection('profiles').doc(userId).collection('reactions').doc(loggedInUserId);
        if (emojiDocOfSubCol) {
            emojiDocOfSubCol.onSnapshot(docSnapshot => {
                if (docSnapshot.data()) {
                    setActiveEmoji(docSnapshot.data().emoji)
                } else {
                    setActiveEmoji(DEFAULT_EMOJI)
                }
            });
        }
    }, [userId, loggedInUserId]);

    const handleEmojiClick = (e) => {
        db.collection(`profiles`).doc(userId).collection('reactions').doc(loggedInUserId).set({
            emoji: e.target.innerText
        });
    };

    const emojiMap = EMOJI_ARRAY.map((item, idx) =>
        <li key={idx} id={idx} style={{ cursor: 'pointer' }} onClick={handleEmojiClick}>
            <span>{item}</span>
        </li>);

    return <ContainerCustom>
        <span className='reaction_class'>Drop a voodoo chant!</span>
        <Container style={{ textAlign: 'center' }}
            onClick={() => setToggleEmoji(!toggleEmoji)}>
            <span style={{ cursor: 'pointer' }}>{activeEmoji}</span>

            {toggleEmoji &&
                <UlCustom>
                    {emojiMap}
                </UlCustom>
            }
        </Container>
    </ContainerCustom>
}