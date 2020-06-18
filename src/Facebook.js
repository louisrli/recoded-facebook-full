import React, { useState } from "react";
import db from "./firebase";
import Card from "react-bootstrap/Card";
import { defaultStyle_main, defaultStyle_children } from './ReactionStyles';
import { EmojiBox } from './EmojiBox';
const ProfileBox = ({ city, imageUrl, name, profile, userId }) => {
  return (
    <Card style={defaultStyle_children}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{profile}</Card.Text>
        <Card.Text>{city}</Card.Text>
        <EmojiBox />
      </Card.Body>
    </Card>
  );
};

const FacebookPage = () => {
  const [profiles, setProfiles] = React.useState([]);

  React.useEffect(() => {
    const doAsync = async () => {
      const profiles = await db
        .collection("profiles")
        .get()
        .then((querySnapshot) => {
          return querySnapshot.docs.map((doc) => doc.data());
        });
      setProfiles(profiles);
    };
    profiles && doAsync();
  }, []);
  return (
    <div style={defaultStyle_main}>
      {profiles.map((p) => (
        <ProfileBox {...p} />
      ))}
    </div>
  );
};

export default FacebookPage;
