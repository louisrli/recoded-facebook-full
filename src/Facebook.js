import React from "react";
import db from "./firebase";
import Card from "react-bootstrap/Card";
import { CardContainer, CardChildren } from './EmojiBox.styles';
import { EmojiBox } from './EmojiBox';
import firebase from "firebase";
import { storage } from './firebase';

const ProfileBox = ({ city, imageUrl, name, profile, userId }) => {
  const [loggedInUserId, setLoggedInUserId] = React.useState("")

  React.useEffect(() => {
    const getUserId = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setLoggedInUserId(user.uid);
        } else {
          console.log('error');
        }
      });
    };
    getUserId();
  }, []);

  return (
    <CardChildren className="card">
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{profile}</Card.Text>
        <Card.Text>{city}</Card.Text>
        {loggedInUserId ? <EmojiBox userId={userId} loggedInUserId={loggedInUserId} />
          : <span>Log-in to see reactions.</span>}
        {userId === loggedInUserId && (
          <EditProfile
            userId={loggedInUserId}
            userDetails={{
              city: city,
              profile: profile,
              originalImageUrl: imageUrl,
            }}
          />
        )}
      </Card.Body>
    </CardChildren>
  );
};

const EditProfile = (props) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState('');
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const showEditInputs = () => {
    setIsEditing(true);
  };

  const handleChooseImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image != null) {
      const uploadTask = storage
        .ref(`profilePictures/${props.userId}/${image.name}`)
        .put(image);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref(`profilePictures/${props.userId}`)
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setImageUrl(url);
            });
        }
      );
    }
  };

  const hideAndSubmitEditInputs = (e) => {
    e.preventDefault();
    const cityInputValue = e.target[1].value;
    const profileInputValue = e.target[0].value;

    db.collection('profiles')
      .doc(props.userId)
      .update({
        city: cityInputValue ? cityInputValue : props.userDetails.city,
        profile: profileInputValue
          ? profileInputValue
          : props.userDetails.profile,
        imageUrl: imageUrl ? imageUrl : props.userDetails.originalImageUrl,
      });
    setIsEditing(false);
  };

  const formFields = () => {
    return (
      <form onSubmit={(e) => hideAndSubmitEditInputs(e)}>
        <input type='text' placeholder='Profile' />
        <input type='text' placeholder='City' />
        <progress value={uploadProgress} max='100' />
        <input type='file' onChange={handleChooseImage} />
        <button type='button' onClick={handleUpload}>
          Upload
        </button>
        <button>submit</button>
      </form>
    );
  };

  return (
    <div>
      {isEditing === false ? (
        <button onClick={showEditInputs}>Edit Profile</button>
      ) : (
          formFields()
        )}
    </div>
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
      if (profiles) {
        setProfiles(profiles);
      };
    };
    doAsync();
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
