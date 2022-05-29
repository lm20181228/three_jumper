// 初始化
function init(){
    // 场景创建
   
    camera.position.set(this.cameraConfig.position.x,this.cameraConfig.position.y,this.cameraConfig.position.z);
    camera.lookAt(this.camera.position); //设置相机方向(指向的场景对象)

    // 设置光源  平行光 （颜色，强度）
    let directionalLight = new THREE.DirectionalLight(0xffffff,1.1)
    // 平行光位置
    directionalLight.position.set(3,10,5);
    // 在场景中加入平行光
    scene.add(directionalLight);
    // 添加光线的材质
    let light = new THREE.AmbientLight(0xffffff,0.4);
    // 在场景中添加光
    scene.add(light);

    
    //   this.property.render = render;


    
    // _createCube.call(jumperConfig);
    // _createCube.call(jumperConfig);
    // _createJumper.call(jumperConfig);
    this.createCube();
    this.createCube();
    this.createJumper();
     // 渲染进场相机（后续更新也是这儿）
    this.renderer.render(this.scene,this.camera);
     // 把当前渲染的画布放置到body中
    document.body.appendChild(this.renderer.domElement);

    this.startGame();
    // 监听分数变动
  Object.defineProperty(jumpTojump,"score",{
    set(value){
      console.log("value",value)
      jumpTojump._score = value;
      let soreDom = document.getElementsByClassName("score");
      soreDom[0].innerHTML = jumpTojump._score;
      soreDom[1].innerHTML = jumpTojump._score;
    },
    get(){
      return jumpTojump._score || 0;
    }
  })
    
}