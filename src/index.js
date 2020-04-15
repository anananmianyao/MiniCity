
var THREE = require('three');
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function init() {
    // 获取浏览器窗口的宽高，后续会用
    var width = window.innerWidth
    var height = window.innerHeight

    // 创建一个场景
    var scene = new THREE.Scene()

    // 创建一个具有透视效果的摄像机
    var camera = new THREE.PerspectiveCamera(80, width / height, 0.1, 800)

    // 设置摄像机位置，并将其朝向场景中心
    camera.position.x = 10
    camera.position.y = 10
    camera.position.z = 30
    camera.lookAt(scene.position)

    // 创建一个 WebGL 渲染器，Three.js 还提供 <canvas>, <svg>, CSS3D 渲染器。
    var renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true // 开启抗齿锯效果
    })
    renderer.shadowMap.enabled = true

    var controls = new OrbitControls(camera, renderer.domElement);

    //final update loop
    var MyUpdateLoop = function () {
        //call the render with the scene and the camera
        renderer.render(scene, camera);

        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        // cube.rotation.z += 0.01;

        controls.update();

        //finally perform a recoursive call to update again
        //this must be called because the mouse change the camera position
        requestAnimationFrame(MyUpdateLoop);

    };

    requestAnimationFrame(MyUpdateLoop);

    
    var loader = new GLTFLoader();

    loader.load('./src/assets/hill.glb', function (gltf) {

        scene.add(gltf.scene);

    }, undefined, function (error) {

        console.error(error);

    });

    var ambiColor = "#ffffff";
    var ambientLight = new THREE.AmbientLight(ambiColor, 4);

    // 设置渲染器的清除颜色（即背景色）和尺寸。
    // 若想用 body 作为背景，则可以不设置 clearColor，然后在创建渲染器时设置 alpha: true，即 new THREE.WebGLRenderer({ alpha: true })
    // renderer.setClearColor(0xffffff, 1)
    renderer.setSize(width, height)

    // 创建一个长宽高均为 4 个单位长度的立方体（几何体）
    var cubeGeometry = new THREE.BoxGeometry(8, 8, 8)

    // 创建材质（该材质不受光源影响）
    var cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0x727ef3,
        wireframe: true
    })

    // 创建一个立方体网格（mesh）：将材质包裹在几何体上
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    // 设置网格的位置
    cube.position.x = 0
    cube.position.y = -2
    cube.position.z = 0

    // var light = new THREE.PointLight(0xffffff, 1, 100);
    // light.position.set(50, 50, 50);
    const light = new THREE.DirectionalLight('#fff', 1)
    light.position.set(50, 50, 50)
    scene.add(light);

    // 将立方体网格加入到场景中
    // scene.add(cube)
    scene.add(ambientLight)

    // 将渲染器的输出（此处是 canvas 元素）插入到 body 中
    document.body.appendChild(renderer.domElement)

    // 渲染，即摄像机拍下此刻的场景
    renderer.render(scene, camera)
}
init()