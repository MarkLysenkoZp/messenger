import Logger from './Logger';
import { HOST, MEDIA_CONSTRAINTS } from './constants';

class ChatClient {
  localVideo: string;
  remoteVideo: string;
  hangUpButton: string;
  connection: any;
  clientId: number;
  myUsername: string;
  targetUsername: string;
  myPeerConnection: any;
  transceiver: any;
  webcamStream: any;

  constructor(localVideoId: string, remoteVideoId: string, hangUpButtonId: string) {
    this.localVideo = localVideoId;
    this.remoteVideo = remoteVideoId;
    this.hangUpButton = hangUpButtonId;

    this.connection = null;
    this.clientId = 0;
    this.myUsername = '';
    this.targetUsername = '';        // To store username of other peer
    this.myPeerConnection = null;    // RTCPeerConnection
    this.transceiver = null;         // RTCRtpTransceiver
    this.webcamStream = null;        // MediaStream from webcam
  }

  sendToServer(msg: any) {
    var msgJSON = JSON.stringify(msg);

    Logger.log("Sending '" + msg.type + "' message: " + msgJSON);
    this.connection.send(msgJSON);
  }

  // Called when the "clientId" message is received; this message is sent by the
  // server to assign this login session a unique ID number; in response,
  // this function sends a "username" message to set our username for this
  // session.
  setUsername(name: string) {
    this.myUsername = name;
    this.sendToServer({
      name: this.myUsername,
      date: Date.now(),
      clientId: this.clientId,
      type: "username"
    });
  }

  // Open and configure the connection to the WebSocket server.
  connect() {
    if (this.connection) {
      console.log('Attempt to connect when a connection already exists. Prevented');
      return;
    }

    let serverUrl: any = '';
    var scheme = "wss";

    serverUrl = scheme + "://" + HOST;

    Logger.log(`Connecting to server: ${serverUrl}`);
    this.connection = new WebSocket(serverUrl, "json");
  }

  // Handles a click on the Send button (or pressing return/enter) by
  // building a "message" object and sending it to the server.
  handleSendButton(text: string, id: string) {
    var msg: any = {
      text: text,
      type: "message",
      clientId: this.clientId,
      date: Date.now(),
      id: id,
      isEditing: false,
    };
    if(this.targetUsername) {
      msg.target = this.targetUsername;
      msg.from = this.myUsername;
    }
    this.sendToServer(msg);
  }

  // Handles a click on the Update button (or pressing return/enter) by
  // building a "message" object and sending it to the server.
  handleUpdateButton(text: string, id: string) {
    var msg: any = {
      text: text,
      id: id,
      type: "message",
      clientId: this.clientId,
      date: Date.now(),
      isEditing: true,
    };
    if(this.targetUsername) {
      msg.target = this.targetUsername;
      msg.from = this.myUsername;
    }
    this.sendToServer(msg);
  }

  // Handles a click on the Update button (or pressing return/enter) by
  // building a "message" object and sending it to the server.
  handleUpdateButton(text: string, messageId: string) {
    var msg: any = {
      text: text,
      messageId: messageId,
      type: "message",
      id: this.clientID,
      date: Date.now()
    };
    if(this.targetUsername) {
      msg.target = this.targetUsername;
      msg.from = this.myUsername;
    }
    this.sendToServer(msg);
  }

  // Handles a click on the Delete button (or pressing return/enter) by
  // building a "message" object and sending it to the server.
  handleDeleteButton(messageId: string) {
    var msg: any = {
      messageId: messageId,
      type: "message",
      id: this.clientID,
      isDeleted: true,
      date: Date.now()
    };
    this.sendToServer(msg);
  }

  // Create the RTCPeerConnection which knows how to talk to our
  // selected STUN/TURN server and then uses getUserMedia() to find
  // our camera and microphone and add that stream to the connection for
  // use in our video call. Then we configure event handlers to get
  // needed notifications on the call.

  async createPeerConnection() {
    Logger.log("Setting up a connection...");

    // Create an RTCPeerConnection which knows to use our chosen
    // STUN server.

    this.myPeerConnection = new RTCPeerConnection({
      iceServers: [
        // Information about ICE servers - Use your own!
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' }
      ]
    });

    // Set up event handlers for the ICE negotiation process.

    this.myPeerConnection.onicecandidate = this.handleICECandidateEvent.bind(this);
    this.myPeerConnection.oniceconnectionstatechange = this.handleICEConnectionStateChangeEvent.bind(this);
    this.myPeerConnection.onicegatheringstatechange = this.handleICEGatheringStateChangeEvent.bind(this);
    this.myPeerConnection.onsignalingstatechange = this.handleSignalingStateChangeEvent.bind(this);
    this.myPeerConnection.onnegotiationneeded = this.handleNegotiationNeededEvent.bind(this);
    this.myPeerConnection.ontrack = this.handleTrackEvent.bind(this);
  }

  // Called by the WebRTC layer to let us know when it's time to
  // begin, resume, or restart ICE negotiation.

  async handleNegotiationNeededEvent() {
    Logger.log("*** Negotiation needed");

    try {
      Logger.log("---> Creating offer");
      const offer = await this.myPeerConnection.createOffer();

      // If the connection hasn't yet achieved the "stable" state,
      // return to the caller. Another negotiationneeded event
      // will be fired when the state stabilizes.

      if (this.myPeerConnection.signalingState != "stable") {
        Logger.log("     -- The connection isn't stable yet; postponing...")
        return;
      }

      // Establish the offer as the local peer's current
      // description.

      Logger.log("---> Setting local description to the offer");
      await this.myPeerConnection.setLocalDescription(offer);

      // Send the offer to the remote peer.

      Logger.log("---> Sending the offer to the remote peer");
      this.sendToServer({
        name: this.myUsername,
        target: this.targetUsername,
        type: "video-offer",
        sdp: this.myPeerConnection.localDescription
      });
    } catch(err) {
      Logger.log("*** The following error occurred while handling the negotiationneeded event:");
      Logger.reportError(err);
    };
  }

  // Called by the WebRTC layer when events occur on the media tracks
  // on our WebRTC call. This includes when streams are added to and
  // removed from the call.
  //
  // track events include the following fields:
  //
  // RTCRtpReceiver       receiver
  // MediaStreamTrack     track
  // MediaStream[]        streams
  // RTCRtpTransceiver    transceiver
  //
  // In our case, we're just taking the first stream found and attaching
  // it to the <video> element for incoming media.

  handleTrackEvent(event: any) {
    Logger.log("*** Track event");

    const remoteVideo: any = document.getElementById(this.remoteVideo);
    remoteVideo.srcObject = event.streams[0];

    const button: any = document.getElementById(this.hangUpButton);
    button.disabled = false;
  }

  // Handles |icecandidate| events by forwarding the specified
  // ICE candidate (created by our local ICE agent) to the other
  // peer through the signaling server.

  handleICECandidateEvent(event: any) {
    if (event.candidate) {
      Logger.log("*** Outgoing ICE candidate: " + event.candidate.candidate);

      this.sendToServer({
        type: "new-ice-candidate",
        target: this.targetUsername,
        candidate: event.candidate
      });
    }
  }

  // Handle |iceconnectionstatechange| events. This will detect
  // when the ICE connection is closed, failed, or disconnected.
  //
  // This is called when the state of the ICE agent changes.

  handleICEConnectionStateChangeEvent(event: any) {
    Logger.log("*** ICE connection state changed to " + this.myPeerConnection.iceConnectionState);

    switch(this.myPeerConnection.iceConnectionState) {
      case "closed":
      case "failed":
      case "disconnected":
        console.log('UNSTABLE CONNECTION. CLOSING ...');
        console.log('EVENT', event)
        console.log('myPeerConnection', this.myPeerConnection)

        this.closeVideoCall();
        break;
    }
  }

  // Set up a |signalingstatechange| event handler. This will detect when
  // the signaling connection is closed.
  //
  // NOTE: This will actually move to the new RTCPeerConnectionState enum
  // returned in the property RTCPeerConnection.connectionState when
  // browsers catch up with the latest version of the specification!

  handleSignalingStateChangeEvent(event: any) {
    Logger.log("*** WebRTC signaling state changed to: " + this.myPeerConnection.signalingState);
    switch(this.myPeerConnection.signalingState) {
      case "closed":
        console.log('JUST CLOSED');
        this.closeVideoCall();
        break;
    }
  }

  // Handle the |icegatheringstatechange| event. This lets us know what the
  // ICE engine is currently working on: "new" means no networking has happened
  // yet, "gathering" means the ICE engine is currently gathering candidates,
  // and "complete" means gathering is complete. Note that the engine can
  // alternate between "gathering" and "complete" repeatedly as needs and
  // circumstances change.
  //
  // We don't need to do anything when this happens, but we log it to the
  // console so you can see what's going on when playing with the sample.

  handleICEGatheringStateChangeEvent(event: any) {
    Logger.log("*** ICE gathering state changed to: " + this.myPeerConnection.iceGatheringState);
  }

  // Given a message containing a list of usernames, this function
  // populates the user list box with those names, making each item
  // clickable to allow starting a video call.

  handleUserlistMsg(msg: any) {
    var listElem: any = document.querySelector(".userlistbox");

    // Remove all current list members. We could do this smarter,
    // by adding and updating users instead of rebuilding from
    // scratch but this will do for this sample.

    while (listElem.firstChild) {
      listElem.removeChild(listElem.firstChild);
    }

    // Add member names from the received list.

    msg.users.forEach((username: any) => {
      var item = document.createElement("li");
      item.appendChild(document.createTextNode(username));
      item.addEventListener("click", (e) => { this.invite(e) }, false);

      listElem.appendChild(item);
    });
  }

  // Close the RTCPeerConnection and reset variables so that the user can
  // make or receive another call if they wish. This is called both
  // when the user hangs up, the other user hangs up, or if a connection
  // failure is detected.

  closeVideoCall() {
    var localVideo: any = document.getElementById(this.localVideo);

    Logger.log("Closing the call");

    // Close the RTCPeerConnection

    if (this.myPeerConnection) {
      Logger.log("--> Closing the peer connection");

      // Disconnect all our event listeners; we don't want stray events
      // to interfere with the hangup while it's ongoing.

      this.myPeerConnection.ontrack = null;
      this.myPeerConnection.onicecandidate = null;
      this.myPeerConnection.oniceconnectionstatechange = null;
      this.myPeerConnection.onsignalingstatechange = null;
      this.myPeerConnection.onicegatheringstatechange = null;
      this.myPeerConnection.onnotificationneeded = null;

      // Stop all transceivers on the connection

      this.myPeerConnection.getTransceivers().forEach((transceiver: any) => {
        transceiver.stop();
      });

      // Stop the webcam preview as well by pausing the <video>
      // element, then stopping each of the getUserMedia() tracks
      // on it.

      if (localVideo.srcObject) {
        localVideo.pause();
        localVideo.srcObject.getTracks().forEach((track: any) => {
          track.stop();
        });
      }

      // Close the peer connection

      this.myPeerConnection.close();
      this.myPeerConnection = null;
      this.webcamStream = null;
    }

    // Disable the hangup button
    const button: any = document.getElementById(this.hangUpButton);
    button.disabled = true;
    this.targetUsername = '';
  }

  // Handle the "hang-up" message, which is sent if the other peer
  // has hung up the call or otherwise disconnected.

  handleHangUpMsg(msg: any) {
    Logger.log("*** Received hang up notification from other peer");

    this.closeVideoCall();
  }

  // Hang up the call by closing our end of the connection, then
  // sending a "hang-up" message to the other peer (keep in mind that
  // the signaling is done on a different connection). This notifies
  // the other peer that the connection should be terminated and the UI
  // returned to the "no call in progress" state.

  hangUpCall() {
    this.closeVideoCall();

    this.sendToServer({
      name: this.myUsername,
      target: this.targetUsername,
      type: "hang-up"
    });
  }

  // Handle a click on an item in the user list by inviting the clicked
  // user to video chat. Note that we don't actually send a message to
  // the callee here -- calling RTCPeerConnection.addTrack() issues
  // a |notificationneeded| event, so we'll let our handler for that
  // make the offer.

  async invite(evt: any) {
    Logger.log("Starting to prepare an invitation");
    if (this.myPeerConnection) {
      alert("You can't start a call because you already have one open!");
    } else {

      Logger.log("Inviting user " + this.targetUsername);

      // Call createPeerConnection() to create the RTCPeerConnection.
      // When this returns, myPeerConnection is our RTCPeerConnection
      // and webcamStream is a stream coming from the camera. They are
      // not linked together in any way yet.

      Logger.log("Setting up connection to invite user: " + this.targetUsername);
      this.createPeerConnection();

      // Get access to the webcam stream and attach it to the
      // "preview" box (id "local-video").

      try {
        this.webcamStream = await navigator.mediaDevices.getUserMedia(MEDIA_CONSTRAINTS);

        const localVideo: any = document.getElementById(this.localVideo)
        localVideo.srcObject = this.webcamStream;
      } catch(err) {
        this.handleGetUserMediaError(err);
        return;
      }

      // Add the tracks from the stream to the RTCPeerConnection

      try {
        this.webcamStream.getTracks().forEach(
          this.transceiver = (track: any) => this.myPeerConnection.addTransceiver(track, { streams: [this.webcamStream] })
        );
      } catch(err) {
        this.handleGetUserMediaError(err);
      }
    }
  }

  // Accept an offer to video chat. We configure our local settings,
  // create our RTCPeerConnection, get and attach our local camera
  // stream, then create and send an answer to the caller.

  async handleVideoOfferMsg(msg: any) {
    this.targetUsername = msg.name;

    // If we're not already connected, create an RTCPeerConnection
    // to be linked to the caller.

    Logger.log("Received video chat offer from " + this.targetUsername);
    if (!this.myPeerConnection) {
      this.createPeerConnection();
    }

    // We need to set the remote description to the received SDP offer
    // so that our local WebRTC layer knows how to talk to the caller.

    var desc = new RTCSessionDescription(msg.sdp);

    // If the connection isn't stable yet, wait for it...

    if (this.myPeerConnection.signalingState != "stable") {
      Logger.log("  - But the signaling state isn't stable, so triggering rollback");

      // Set the local and remove descriptions for rollback; don't proceed
      // until both return.
      await Promise.all([
        this.myPeerConnection.setLocalDescription({ type: "rollback" }),
        this.myPeerConnection.setRemoteDescription(desc)
      ]);
      return;
    } else {
      Logger.log("  - Setting remote description");
      await this.myPeerConnection.setRemoteDescription(desc);
    }

    // Get the webcam stream if we don't already have it

    if (!this.webcamStream) {
      try {
        this.webcamStream = await navigator.mediaDevices.getUserMedia(MEDIA_CONSTRAINTS);
      } catch(err) {
        this.handleGetUserMediaError(err);
        return;
      }

      const localVideo: any = document.getElementById(this.localVideo);
      localVideo.srcObject = this.webcamStream;

      // Add the camera stream to the RTCPeerConnection

      try {
        this.webcamStream.getTracks().forEach(
          this.transceiver = (track: any) => this.myPeerConnection.addTransceiver(track, { streams: [this.webcamStream] })
        );
      } catch(err) {
        this.handleGetUserMediaError(err);
      }
    }

    Logger.log("---> Creating and sending answer to caller");

    await this.myPeerConnection.setLocalDescription(await this.myPeerConnection.createAnswer());

    this.sendToServer({
      name: this.myUsername,
      target: this.targetUsername,
      type: "video-answer",
      sdp: this.myPeerConnection.localDescription
    });
  }

  // Responds to the "video-answer" message sent to the caller
  // once the callee has decided to accept our request to talk.

  async handleVideoAnswerMsg(msg: any) {
    Logger.log("*** Call recipient has accepted our call");

    // Configure the remote description, which is the SDP payload
    // in our "video-answer" message.

    var desc = new RTCSessionDescription(msg.sdp);
    await this.myPeerConnection.setRemoteDescription(desc).catch(ChatClient.reportError);
  }
  static reportError(reportError: any) {
    throw new Error("Method not implemented.");
  }

  // A new ICE candidate has been received from the other peer. Call
  // RTCPeerConnection.addIceCandidate() to send it along to the
  // local ICE framework.

  async handleNewICECandidateMsg(msg: any) {
    var candidate = new RTCIceCandidate(msg.candidate);

    Logger.log("*** Adding received ICE candidate: " + JSON.stringify(candidate));
    try {
      await this.myPeerConnection.addIceCandidate(candidate)
    } catch(err) {
      Logger.reportError(err);
    }
  }

  // Handle errors which occur when trying to access the local media
  // hardware; that is, exceptions thrown by getUserMedia(). The two most
  // likely scenarios are that the user has no camera and/or microphone
  // or that they declined to share their equipment when prompted. If
  // they simply opted not to share their media, that's not really an
  // error, so we won't present a message in that situation.

  handleGetUserMediaError(e: any) {
    Logger.logError(e);
    switch(e.name) {
      case "NotFoundError":
        alert("Unable to open your call because no camera and/or microphone" +
              "were found.");
        break;
      case "SecurityError":
      case "PermissionDeniedError":
        // Do nothing; this is the same as the user canceling the call.
        break;
      default:
        alert("Error opening your camera and/or microphone: " + e.message);
        break;
    }

    // Make sure we shut down our end of the RTCPeerConnection so we're
    // ready to try again.

    this.closeVideoCall();
  }
}

export default ChatClient;
