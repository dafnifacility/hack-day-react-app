import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import VolumeUp from '@material-ui/icons/VolumeUp';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import aaa from './aaaa.PNG';
import tom from './spinningTom.gif';
import Grid from '@material-ui/core/Grid';

import './App.css';
import { Icon } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(2),
  },
  success: {
    color: 'lime',
  },
  fail: {
    color: '#8A0808',
  },
  horn: {
    color: 'cyan'
  },
  title: {
    flexGrow: 1,
    color: 'white'
  },
  appBar: {
    backgroundColor: 'magenta'
  }
}));

// var amIConnected = true

function ConnectionStatus(props) {
  const classes = useStyles();
  if (props.connected) {
    return ( <h2 className={classes.success}> Connected! </h2> )
  } else {
    return ( <h2 className={classes.fail}> Disconnected! </h2> )
  }
}

function honk() {
  console.log("HONK!")
}

function loadVideo() {
  const mediaStreamConstraints = {
    video: true,
  };

  // Video element where stream will be placed.
  const localVideo = document.querySelector('video');

  // Local stream that will be reproduced on the video.
  let localStream;

  // Handles success by adding the MediaStream to the video element.
  function gotLocalMediaStream(mediaStream) {
    localStream = mediaStream;
    localVideo.srcObject = mediaStream;
  }

  // Handles error by logging a message to the console with the error message.
  function handleLocalMediaStreamError(error) {
    console.log('navigator.getUserMedia error: ', error);
  }
  // Initializes media stream.
  navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
    .then(gotLocalMediaStream).catch(handleLocalMediaStreamError);
}
var keyPressed = false;

function keyDown(event) {
  console.log("pressed:",keyPressed)
  if (!keyPressed) {
    if (event.key.toLowerCase() == "w") {
      console.log("Forward")
      keyPressed = true;
    } else if (event.key.toLowerCase() == "a") {
      console.log("Left")
      keyPressed = true;
    } else if (event.key.toLowerCase() == "s") {
      console.log("Backward")
      keyPressed = true;
    } else if (event.key.toLowerCase() == "d") {
      console.log("Right")
      keyPressed = true;
    }
  }
}

function keyUp(event) {
  if (keyPressed) {
    if (
      event.key.toLowerCase() == "w" ||
      event.key.toLowerCase() == "a" ||
      event.key.toLowerCase() == "s" ||
      event.key.toLowerCase() == "d"
    ) {
      console.log("Stop")
      keyPressed = false;
    }
  }
}

function App() {
  const classes = useStyles();
  window.addEventListener("keydown", (e) => keyDown(e))
  window.addEventListener("keyup", (e) => keyUp(e))

  var [amIConnected, setConnected] = useState(0);

  return (
    <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <AppBar position="static">
        <Toolbar className={classes.appBar}>
          <img src={aaa} height="50" />
          <Typography variant="h3" className={classes.title}>
            {'(>\'\')> JamesBot <(\'\'<)'}
          </Typography>
          <IconButton className={classes.button} aria-label="honk" onClick={honk}>
            <VolumeUp className={classes.horn} />
          </IconButton>
          <ConnectionStatus connected={amIConnected} />
        </Toolbar>
      </AppBar>
      <header className="App-header">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <img src={tom} height="500" onClick={() => {setConnected(!amIConnected); console.log(amIConnected)}}/>
            <video id="LocalVideo" autoPlay playsInline></video>
            <video id="RemoteVideo" autoPlay playsInline></video>
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
