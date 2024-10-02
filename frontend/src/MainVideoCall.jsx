import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Socket from "socket.io-client";
const servers = {
  iceServers: [
    {
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:stun1.l.google.com:19302",
        "stun:stun.l.google.com:3478",
        "stun:stun.l.google.com:3478",
        "stun:stun1.l.google.com:3478",
        "stun:stun2.l.google.com:3478",
        "stun:stun3.l.google.com:3478",
        "stun:stun4.l.google.com:3478",
      ],
    },
  ],
};
const websocket = Socket(
  "https://3ca8570c-4e5f-453b-808d-33204edc9818-00-2mfcp3mu2dvbe.sisko.replit.dev/",
);

export default function MainVideoCall() {
  const userVideo = useRef();
  const clientvideo = useRef();
  let param = useParams();
  let localstream;
  let PeerConnection = new RTCPeerConnection(servers);
  let RemoteStream = new MediaStream();
  useEffect(() => {
    websocket.on("ices", (id, room, ices, message) => {
      if (message === "offer") {
        createanswer(JSON.parse(ices));
      }
      if (message === "ices") {
        Addicecandidate(JSON.parse(ices));
      }
      if (message === "answer") {
        AddAnswer(JSON.parse(ices));
      }
      console.log(message);
    });
  }, [websocket]);

  async function getuservideo() {
    websocket.on("connect", (event) => {
      console.log(websocket.id);
    });
    let uservid = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localstream = uservid;
    userVideo.current.srcObject = uservid;
    ClientVideo();
  }
  async function ShareScreen() {
    websocket.on("connect", (event) => {
      console.log(websocket.id);
    });
    let uservid = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });
    localstream = uservid;
    userVideo.current.srcObject = uservid;
    ClientVideo();
  }
  async function ClientVideo() {
    let offer = await PeerConnection.createOffer();
    console.log(offer);
    await PeerConnection.setLocalDescription(offer);

    clientvideo.current.srcObject = RemoteStream;

    localstream.getTracks().forEach((track) => {
      PeerConnection.addTrack(track, localstream);
    });

    PeerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        RemoteStream.addTrack(track);
      });
    };

    console.log(offer);
    websocket.emit(
      "iceCandidate",
      websocket.id,
      param.id,
      JSON.stringify(offer),
      "offer",
    );

    PeerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        websocket.emit(
          "iceCandidate",
          websocket.id,
          param.id,
          JSON.stringify(event.candidate),
          "ices",
        );
      }
    };
  }

  async function createanswer(offer) {
    await PeerConnection.setRemoteDescription(offer);
    let answer = await PeerConnection.createAnswer();

    await PeerConnection.setLocalDescription(answer);

    websocket.emit(
      "iceCandidate",
      websocket.id,
      param.id,
      JSON.stringify(answer),
      "answer",
    );
  }

  async function AddAnswer(anser) {
    await PeerConnection.setRemoteDescription(anser);
    ClientVideo();
  }

  async function Addicecandidate(iceCandidate) {
    await PeerConnection.addIceCandidate(iceCandidate);
    ClientVideo();
  }

  return (
    <div style={{ height: "100vh" }}>
      <h5>{param.id}</h5>
      <div>
        <video
          autoPlay={true}
          ref={userVideo}
          style={{
            height: "8rem",
            position: "absolute",
            zIndex: 5,
            top: "14%",
          }}
        ></video>
        <video autoPlay={true} ref={clientvideo}></video>
      </div>

      <button className="btn btn-danger" onClick={getuservideo}>
        Start Video
      </button>
      <button onClick={ShareScreen} className="btn btn-success">
        Share Screen
      </button>
    </div>
  );
}
