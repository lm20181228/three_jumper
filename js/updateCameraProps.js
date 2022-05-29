// 更新相机位置
function updateCamera(){
    let camera =this.camera;
    camera.position.set(this.cameraConfig.position.x,this.cameraConfig.position.y,this.cameraConfig.position.z);
    camera.lookAt(camera.position); //设置相机方向(指向的场景对象)
    this.render();
}