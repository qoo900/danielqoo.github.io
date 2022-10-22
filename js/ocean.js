import * as THREE from './lib/three.module.js';

//import Stats from './lib/stats.module.js';

import { GUI } from './lib/dat.gui.module.js';
import { OrbitControls } from './lib/OrbitControls.js';
import { Water } from './lib/Water.js';
import { Sky } from './lib/Sky.js';
import {GLTFLoader} from 'GLTFLoader';





    let container, stats;
    let camera, scene, renderer;
    let controls, water, sun;
    let clock, delta, boxes, numBoxes;

    const waves = {
        A: { direction: 0, steepness: 0, wavelength: 25 },
        B: { direction: 0, steepness: 0.1, wavelength: 20 },
        C: { direction: 0, steepness: 0.1, wavelength: 30 },
    };

    function getWaveInfo( x, z, time ) {

        const pos = new THREE.Vector3();
        const tangent = new THREE.Vector3( 1, 0, 0 );
        const binormal = new THREE.Vector3( 0, 0, 1 );
        Object.keys( waves ).forEach( ( wave ) => {

            const w = waves[ wave ];
            const k = ( Math.PI * 2 ) / w.wavelength;
            const c = Math.sqrt( 9.8 / k );
            const d = new THREE.Vector2(
                Math.sin( ( w.direction * Math.PI ) / 180 ),
                - Math.cos( ( w.direction * Math.PI ) / 180 )
            );
            const f = k * ( d.dot( new THREE.Vector2( x, z ) ) - c * time );
            const a = w.steepness / k;

            pos.x += d.y * ( a * Math.cos( f ) );
            pos.y += a * Math.sin( f );
            pos.z += d.x * ( a * Math.cos( f ) );

            tangent.x += - d.x * d.x * ( w.steepness * Math.sin( f ) );
            tangent.y += d.x * ( w.steepness * Math.cos( f ) );
            tangent.z += - d.x * d.y * ( w.steepness * Math.sin( f ) );

            binormal.x += - d.x * d.y * ( w.steepness * Math.sin( f ) );
            binormal.y += d.y * ( w.steepness * Math.cos( f ) );
            binormal.z += - d.y * d.y * ( w.steepness * Math.sin( f ) );

        } );

        const normal = binormal.cross( tangent ).normalize();

        return { position: pos, normal: normal };

    }

    function updateBoxes( delta ) {

        const t = water.material.uniforms[ 'time' ].value;
        boxes.forEach( ( b ) => {

            const waveInfo = getWaveInfo( b.position.x, b.position.z, t );
            b.position.y = waveInfo.position.y;
            const quat = new THREE.Quaternion().setFromEuler(
                new THREE.Euler( waveInfo.normal.x, waveInfo.normal.y, waveInfo.normal.z )
            );
            b.quaternion.rotateTowards( quat, delta * 0.5 );

        } );

    }

    function updatebody( delta ) {

    const t = water.material.uniforms[ 'time' ].value;
    boxes.forEach( ( b ) => {

        const waveInfo = getWaveInfo( b.position.x, b.position.z, t );
        b.position.y = waveInfo.position.y;
        const quat = new THREE.Quaternion().setFromEuler(
            new THREE.Euler( waveInfo.normal.x, waveInfo.normal.y, waveInfo.normal.z )
        );
        b.quaternion.rotateTowards( quat, delta * 0.5 );

    } );

    }


    init();
    animate();

    function init() {

        container = document.getElementById( 'container' );

        //

        renderer = new THREE.WebGLRenderer({
            antialias : true
        });
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        container.appendChild( renderer.domElement );

        //

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(
            55,
            window.innerWidth / window.innerHeight,
            1,
            20000
        );
        camera.position.set( 0, 30, 200 );

        //

        sun = new THREE.Vector3();










        // floating boxes




        const boxGeometry = new THREE.BoxGeometry( 5, 5, 5 );
        numBoxes = 20;
        boxes = [];

        for ( let i = 0; i < numBoxes; i ++ ) {

            const box = new THREE.Mesh(
                boxGeometry,
                new THREE.MeshStandardMaterial( {color: "#C79C7C", roughness: 0 } )
            );


            
            box.position.set( Math.random() * 200 - 100, 0, Math.random() * 200 - 100 );
            scene.add( box );
            boxes.push( box );

        }
        

        function tweenModel(mesh, msec){
            const posSrc = {pos:-3};
            let tween = new TWEEN.Tween( posSrc )
                .to( { pos: -1 }, msec )
                .easing( TWEEN.Easing.Cubic.InOut )
                .yoyo(true)
                .repeat(Infinity)
                .onUpdate(function() {
                    mesh.position.y = posSrc.pos;
                } )
                .start();
        }


        function setRandomModel(mesh){
            let model = mesh.clone();

            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
            }

            model.position.x = getRandomInt(-100, 100)
            model.position.z = getRandomInt(0, 100)
            model.rotation.y = (4/2)*Math.PI;
            model.scale.set(10.0, 10.0, 10.0);

            tweenModel(model, getRandomInt(3000, 12000));
            scene.add( model );
        }

        function setModel(){
            console.log("setModel...");
            loadTexture();

            renderer.gammaFactor = 2.2;
            renderer.outputEncoding = THREE.LinearEncoding;
            //renderer.outputEncoding = THREE.sRGBEncoding;
        }

        function loadTexture(){
            console.log("loadTexture...");
            
            const loader = new THREE.TextureLoader();
            loader.load(
                // resource URL
                './img/Map-COL.jpg',
                // onLoad callback
                function ( texture ) {
                    loadModel(texture);
                },
                // onProgress callback currently not supported
                undefined,
                // onError callback
                function ( error ) {
                    console.error( 'An error happened.' );
                    console.log(error);
                }
            );
        }

        function loadModel(texture){
            console.log("loadModel...");

            let model = null;
            const loader = new GLTFLoader();
            loader.load(
                // resource URL
                "./img/dead_body.glb",
                // called when the resource is loaded
                function ( gltf ){
                    model = gltf.scene;
                    model.name = "model-face";
                    model.scale.set(10.0, 10.0, 10.0);
                    // model.position.set(0,0,0);

                    // Set texture and
                    gltf.scene.traverse( function ( child ) {
                        if ( child.isMesh ) {
                            let model2 = child.clone();

                            // Set model on random position
                            for (let index = 0; index < 20; index++) {
                                setRandomModel(child)
                            }

                            // Set big model
                            child.position.z = -50.0
                            child.position.y = 5.0
                            //child.rotation.x = -(1/2)*Math.PI;
                            child.rotation.y = (1/2)*Math.PI;
                            //child.rotation.z = (1/2)*Math.PI;
                            child.material.map = texture;
                            //console.log("mat-color:",child.material.color);
                            //child.material.color = new THREE.Color("rgb(255, 255, 255)");
                            //child.material.color = new THREE.Color( 1.0, 1.0, 1.0 )
                            //child.material.envMap = envMap;
                            child.scale.set(20,20,20);

                            setColorGui(child);

                            // Set model in front
                            model2.position.x = -0.3
                            model2.position.y = -2.1
                            model2.position.z = 8.0
                            model2.rotation.y = Math.PI;

                            tweenModel(model2, 8000);
                            scene.add( model2 );
                        }
                    });

                    scene.add( model );
                    //scene.add( model2 );
                },
                // called while loading is progressing
                function ( xhr ) {
                    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                },
                // called when loading has error
                function ( error ) {
                    console.log('An error happened');
                    console.log(error);
                }
            );
        }


        function setColorGui(mesh){
            let folder = gui.addFolder('Body');

            let params = {
                //color: 0xffffff,
                r: 2.0,
                g: 3.0,
                b: 3.0,
            };

            function colorChanged() {
                mesh.material.color = new THREE.Color( params.r, params.g, params.b );
            }

            folder.add( params, "r", 0.0, 5.0, 0.01 ).onChange( colorChanged );
            folder.add( params, "g", 0.0, 5.0, 0.01 ).onChange( colorChanged );
            folder.add( params, "b", 0.0, 5.0, 0.01 ).onChange( colorChanged );

            colorChanged();
        }




        setModel();





        // Water

        const waterGeometry = new THREE.PlaneGeometry( 2048, 2048, 512, 512 );

        water = new Water( waterGeometry, {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load(
                './img/waternormals.jpg',
                function ( texture ) {

                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

                }
            ),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 8,
            fog: scene.fog !== undefined,
        } );
        water.rotation.x = - Math.PI / 2;

        water.material.onBeforeCompile = function ( shader ) {

            shader.uniforms.waveA = {
                value: [
                    Math.sin( ( waves.A.direction * Math.PI ) / 180 ),
                    Math.cos( ( waves.A.direction * Math.PI ) / 180 ),
                    waves.A.steepness,
                    waves.A.wavelength,
                ],
            };
            shader.uniforms.waveB = {
                value: [
                    Math.sin( ( waves.B.direction * Math.PI ) / 180 ),
                    Math.cos( ( waves.B.direction * Math.PI ) / 180 ),
                    waves.B.steepness,
                    waves.B.wavelength,
                ],
            };
            shader.uniforms.waveC = {
                value: [
                    Math.sin( ( waves.C.direction * Math.PI ) / 180 ),
                    Math.cos( ( waves.C.direction * Math.PI ) / 180 ),
                    waves.C.steepness,
                    waves.C.wavelength,
                ],
            };
            shader.vertexShader = document.getElementById( 'vertexShader' ).textContent;
            shader.fragmentShader = document.getElementById( 'fragmentShader' ).textContent;

        };

        scene.add( water );

        // Skybox

        const sky = new Sky();
        sky.scale.setScalar( 10000 );
        scene.add( sky );

        const skyUniforms = sky.material.uniforms;

        skyUniforms[ 'turbidity' ].value = 10;
        skyUniforms[ 'rayleigh' ].value = 2;
        skyUniforms[ 'mieCoefficient' ].value = 0.005;
        skyUniforms[ 'mieDirectionalG' ].value = 0.8;

        const parameters = {
            elevation: 0,
            azimuth: 180,
        };

        const pmremGenerator = new THREE.PMREMGenerator( renderer );

        function updateSun() {

            const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
            const theta = THREE.MathUtils.degToRad( parameters.azimuth );

            sun.setFromSphericalCoords( 1, phi, theta );

            sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
            water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

            scene.environment = pmremGenerator.fromScene( sky ).texture;

        }

        updateSun();

        //

        controls = new OrbitControls( camera, renderer.domElement );
        controls.maxPolarAngle = Math.PI * 0.495;
        controls.target.set( 0, 10, 0 );
        controls.minDistance = 40.0;
        controls.maxDistance = 200.0;
        controls.update();

        //




        // create an AudioListener and add it to the camera
        const listener = new THREE.AudioListener();
        camera.add( listener );

        // create a global audio source
        const sound = new THREE.Audio( listener );

        // load a sound and set it as the Audio object's buffer
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load( './hard01/creepy-ambient.mp3', function( buffer ) {
            sound.setBuffer( buffer );
            sound.setLoop( true );
            sound.setVolume( 2.0 );
            sound.play();
        });





        //stats = new Stats();
        //container.appendChild( stats.dom );

        // GUI

        const gui = new GUI();

        const folderSky = gui.addFolder( 'Sky' );
        folderSky.add( parameters, 'elevation', -2.5, 2.5, 0.1 ).onChange( updateSun );
        folderSky.add( parameters, 'azimuth', - 180, 180, 0.1 ).onChange( updateSun );
        folderSky.open();

        const waterUniforms = water.material.uniforms;

        const folderWater = gui.addFolder( 'Water' );
        folderWater
            .add( waterUniforms.distortionScale, 'value', 0, 8, 0.1 )
            .name( 'distortionScale' );
        folderWater.add( waterUniforms.size, 'value', 0.1, 10, 0.1 ).name( 'size' );
        folderWater.add( water.material, 'wireframe' );
        folderWater.open();

        const waveAFolder = gui.addFolder( 'Wave A' );
        waveAFolder
            .add( waves.A, 'direction', 0, 359 )
            .name( 'Direction' )
            .onChange( ( v ) => {

                const x = ( v * Math.PI ) / 180;
                water.material.uniforms.waveA.value[ 0 ] = Math.sin( x );
                water.material.uniforms.waveA.value[ 1 ] = Math.cos( x );
    
            } );
        waveAFolder
            .add( waves.A, 'steepness', 0, 1, 0.1 )
            .name( 'Steepness' )
            .onChange( ( v ) => {

                water.material.uniforms.waveA.value[ 2 ] = v;
    
            } );
        waveAFolder
            .add( waves.A, 'wavelength', 1, 100 )
            .name( 'Wavelength' )
            .onChange( ( v ) => {

                water.material.uniforms.waveA.value[ 3 ] = v;
    
            } );
        waveAFolder.open();

        const waveBFolder = gui.addFolder( 'Wave B' );
        waveBFolder
            .add( waves.B, 'direction', 0, 359 )
            .name( 'Direction' )
            .onChange( ( v ) => {

                const x = ( v * Math.PI ) / 180;
                water.material.uniforms.waveB.value[ 0 ] = Math.sin( x );
                water.material.uniforms.waveB.value[ 1 ] = Math.cos( x );
    
            } );
        waveBFolder
            .add( waves.B, 'steepness', 0, 1, 0.1 )
            .name( 'Steepness' )
            .onChange( ( v ) => {

                water.material.uniforms.waveB.value[ 2 ] = v;
    
            } );
        waveBFolder
            .add( waves.B, 'wavelength', 1, 100 )
            .name( 'Wavelength' )
            .onChange( ( v ) => {

                water.material.uniforms.waveB.value[ 3 ] = v;
    
            } );
        waveBFolder.open();

        const waveCFolder = gui.addFolder( 'Wave C' );
        waveCFolder
            .add( waves.C, 'direction', 0, 359 )
            .name( 'Direction' )
            .onChange( ( v ) => {

                const x = ( v * Math.PI ) / 180;
                water.material.uniforms.waveC.value[ 0 ] = Math.sin( x );
                water.material.uniforms.waveC.value[ 1 ] = Math.cos( x );
    
            } );
        waveCFolder
            .add( waves.C, 'steepness', 0, 1, 0.1 )
            .name( 'Steepness' )
            .onChange( ( v ) => {

                water.material.uniforms.waveC.value[ 2 ] = v;
    
            } );
        waveCFolder
            .add( waves.C, 'wavelength', 1, 100 )
            .name( 'Wavelength' )
            .onChange( ( v ) => {

                water.material.uniforms.waveC.value[ 3 ] = v;
    
            } );
        waveCFolder.open();
        //

        window.addEventListener( 'resize', onWindowResize );

        clock = new THREE.Clock();

        gui.close();

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

        requestAnimationFrame( animate );
        delta = clock.getDelta();
        water.material.uniforms[ 'time' ].value += delta;

        var speed = Date.now() * 0.0001;
        camera.position.x = Math.sin(speed) * 60;
        
        camera.lookAt(scene.position);


        updateBoxes( delta );
        updatebody( delta );
        render();
        //stats.update();

    }

    function render() {

        renderer.render( scene, camera );

    }




