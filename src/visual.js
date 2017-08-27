import * as THREE from "three"
import Player from "./music/player.js"
import Perlin from "./perlin/perlin.js"
import Brush from "./visual/brush.js"
import Canvas from "./visual/canvas.js"

class Visual {
    constructor() {

        //Setup Renderer
        this.rdrr = new THREE.WebGLRenderer({ alpha: false, antialias: true });
        this.rdrr.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.rdrr.domElement);

        //Setup perlin noise
        this.perlin = new Perlin({rdrr : this.rdrr, gridWidth : 16, gridHeight : 16, texWidth : 64, texHeight : 64});

        //Setup Player
        this.player = new Player();

        //Setup Scene & add brushes
        this.scene = new THREE.Scene();
        this.scene.add(new Brush({x : -10.0, y : 0.0}, this.rdrr, this.perlin));
        this.scene.add(new Brush({x : - 6.0, y : 0.0}, this.rdrr, this.perlin));
        this.scene.add(new Brush({x : - 2.0, y : 0.0}, this.rdrr, this.perlin));
        this.scene.add(new Brush({x :   2.0, y : 0.0}, this.rdrr, this.perlin));
        this.scene.add(new Brush({x :   6.0, y : 0.0}, this.rdrr, this.perlin));
        this.scene.add(new Brush({x :  10.0, y : 0.0}, this.rdrr, this.perlin));

        //Setup Camera
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1.0, 1000.0);
        this.camera.position.z = 20.0;

        //Setup Canvas 
        //it's made for brush effect (unerasing)
        this.canvas = new Canvas(this.rdrr, this.perlin);
    }   

    update(t, dt) {
        //Perlin noise update
        this.perlin.update(dt);

        //Player Freq update
        this.player.update();

        //update objects included scene
        this.scene.children.forEach((brush, idx) => {
            if(brush.update) {
                var fft = 0.0;
                for(var i = idx * 5; i < idx * 5 + 5; i ++) fft += this.player.fft[i * 5] / 256.0;
                brush.update(t, dt, fft / 5.0);
            }
        });

        //update canvas
        this.canvas.update(dt);

        //render 
        this.canvas.render(this.scene, this.camera);
    }
}


export default Visual;