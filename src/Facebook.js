import React from "react";
import db from "./firebase";
import Card from "react-bootstrap/Card";
import { CardContainer, CardChildren } from './EmojiBox.styles';
import { EmojiBox } from './EmojiBox';
import firebase from "firebase";

const ProfileBox = ({ city, imageUrl, name, profile, userId }) => {
  const [loggedInUserId, setLoggedInUserId] = React.useState("")
  const getUserId = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedInUserId(user.uid);
      } else {
        console.log('error')
      }
    });
  }

  React.useEffect(() => {
    getUserId()
  }, []);

  return (
    <CardChildren className="card">
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{profile}</Card.Text>
        <Card.Text>{city}</Card.Text>
        {loggedInUserId ? <EmojiBox userId={userId} loggedInUserId={loggedInUserId} />
          : <span className="need-Login">Log-in to see reactions.</span>}
        {userId === loggedInUserId && <EditProfile userId={loggedInUserId} />}
      </Card.Body>
    </CardChildren>
  );
};

const EditProfile = (props) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const showEditInputs = () => {
    setIsEditing(true);
  }

  const hideAndSubmitEditInputs = (e) => {
    e.preventDefault()
    const cityInputValue = e.target[1].value;
    const profileInputValue = e.target[0].value;
    db.collection("profiles").doc(props.userId).update({
      city: cityInputValue,
      profile: profileInputValue
    })
    setIsEditing(false);
  }

  const formFields = () => {
    return (
      <form onSubmit={(e) => hideAndSubmitEditInputs(e)}>
        <input type="text" placeholder="Profile" />
        <input type="text" placeholder="City" />
        <button>submit</button>
      </form>
    )
  }
  return (
    <div>
      {isEditing === false ? <button onClick={showEditInputs} >Edit Profile</button> : formFields()}
    </div>
  )
}
const FacebookPage = () => {
  const [profiles, setProfiles] = React.useState([]);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    const doAsync = async () => {
      const profiles = await db
        .collection("profiles")
        .get()
        .then((querySnapshot) => {
          return querySnapshot.docs.map((doc) => doc.data());
        });
      if (profiles) {
        setProfiles(profiles);
        isMounted.current = true;
      };
    };
    doAsync();
    return () => (isMounted.current = false);
  }, []);

  return (
    <CardContainer>
      {profiles && profiles.map((p, idx) => (
        <ProfileBox key={idx} {...p} />
      ))}
    </CardContainer>
  );
};

export default FacebookPage;
