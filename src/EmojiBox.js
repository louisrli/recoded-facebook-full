import React, { useState, useEffect } from "react";
import { UL_CUSTOM, DEFAULT_EMOJI, EMOJI_ARRAY, CONTAINER_CUSTOM } from './ReactionStyles';
import Container from "react-bootstrap/Container";
import db from "./firebase";

export const EmojiBox = ({ userId, loggedInUserId }) => {
    const [toggleEmoji, setToggleEmoji] = useState(false);
    const [activeEmoji, setActiveEmoji] = useState();

    useEffect(() => {
        let isMount = true;
        const EMOJI_DOC_OF_SUBCOL = db.collection('profiles').doc(userId).collection('reactions').doc(loggedInUserId);
        if (EMOJI_DOC_OF_SUBCOL) {
            EMOJI_DOC_OF_SUBCOL.onSnapshot(docSnapshot => {
                if (docSnapshot.data() && isMount) {
                    setActiveEmoji(docSnapshot.data().emoji)
                } else {
                    setActiveEmoji(DEFAULT_EMOJI)
                }
            });
        }
        return () => isMount = false;
    })
    const handleEmojiClick = (e) => {
        db.collection(`profiles`).doc(userId).collection('reactions').doc(loggedInUserId).set({
            emoji: e.target.innerText
        });
    };

    const emojiMap = () => EMOJI_ARRAY.map((item, idx) =>
        <li key={idx} id={idx} style={{ cursor: 'pointer' }} onClick={handleEmojiClick}>
            <span>{item}</span>
        </li>);

    return <CONTAINER_CUSTOM>
        <span className='reaction_class'>Drop a voodoo chant!</span>
        <Container style={{ textAlign: 'center' }}
            onClick={() => setToggleEmoji(!toggleEmoji)}>
            <span style={{ cursor: 'pointer' }}>{activeEmoji}</span>

            {toggleEmoji &&
                <UL_CUSTOM>
                    {emojiMap()}
                </UL_CUSTOM>
            }
        </Container>
    </CONTAINER_CUSTOM>
}