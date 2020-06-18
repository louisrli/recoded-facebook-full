import React, { useState } from "react";
import { default_ul, defaultEmoji, emojiArr, container_absolute } from './ReactionStyles';
import Container from "react-bootstrap/Container";

export const EmojiBox = () => {
    const [emojiReact, setEmoji] = useState(false);
    const [toggleEmoji, setToggleEmoji] = useState(false);
    const [activeEmoji, setActiveEmoji] = useState(defaultEmoji);
    const handleEmojiClick = (e) => {
        setActiveEmoji(e.target.innerText);
        setEmoji(!emojiReact);
    }

    const emojiMap = () => emojiArr.map((item, idx) =>
        <li key={idx} id={idx} style={{ cursor: 'pointer' }} onClick={handleEmojiClick}>
            <span>{item}</span>
        </li>);

    return <Container style={container_absolute}>
        <span className='reaction_class'>Drop a reaction!</span>
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