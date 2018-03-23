import React, { Component } from 'react';
import AudioRecorder from 'react-audio-recorder';

export default class SoundRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  saveAudio = (arg) => {
    console.log(arg);
    var reader = new FileReader();
    reader.addEventListener("loadend", function() {
      // reader.result contains the contents of blob as a typed array
      console.log(reader.result);
    });
    reader.readAsArrayBuffer(arg.audioData);

    const context = new (window.AudioContext || window.webkitAudioContext)();
    
    const audioBuffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
    
    const audio = context.createBufferSource();
    audio.buffer = audioBuffer;
    
    audio.connect(context.destination);
    audio.start();
  }

  render() {
    return (
    <AudioRecorder
      downloadable={false}
      onChange={this.saveAudio}
    />)
  }
}
