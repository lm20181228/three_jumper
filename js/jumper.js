// 创建跳跃者
function createJumper(){
    // 创建一个几何对象 (宽，高，深度)
     let geometry = new THREE.CubeGeometry(this.config.jumperWidth,this.config.jumperHeight,this.config.jumperDeep);
    // 添加材质 颜色，透明度
    let material = new THREE.MeshLambertMaterial({
        color:this.config.jumperColor
    })
    // 合并在一起
    this.jumper = new THREE.Mesh(geometry,material);
    // 显示跳块
    this.jumper.position.y = 1;
    // 平移
    geometry.translate(0,1,0);
    // 添加进场景
    this.scene.add(this.jumper);
}