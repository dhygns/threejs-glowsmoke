
const music_path = "res/bensound-goinghigher.mp3";

export default class Player {
    constructor() {
        var div = document.createElement("div");
        document.body.appendChild(div);

        div.style.backgroundColor = "black";
        div.style.opacity = "0.1";
        div.style.webkitTextFillColor = "white";

        div.style.textAlign = "center";

        div.style.position = "absolute";
        div.style.left = "0px";
        div.style.top = "0px";
        div.style.margin = "10px";
        div.innerHTML = `
        <div style="margin:5px">
            <img src="res/music-note.png" alt="Music" style="width:15px;height:15px"> bensound-goinghigher - <a href="Bensound.com"> Bensound.com </a>
        </div>
        `;


        this.audio = document.createElement("audio");
        div.appendChild(this.audio);

        this.audio.src = music_path;
        this.audio.autoplay = true;
        this.audio.loop = true;


        this.audioCtx = new AudioContext();
        this.source = this.audioCtx.createMediaElementSource(this.audio);
    
        this.analyser = this.audioCtx.createAnalyser();  
        
        this.analyser.fftSize = 512;
    
        this.source.connect(this.analyser);
        this.analyser.connect(this.audioCtx.destination);
    
        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
        this.fft = this.frequencyData;
    }

    update() {
        this.analyser.getByteFrequencyData(this.frequencyData);
        this.fft = this.frequencyData;
    }
}