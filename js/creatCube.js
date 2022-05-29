// 创建块
// 开始渲染第二块
function createCube(){
    console.log(this,"createCubecreateCubecreateCube")
    // 创建一个几何对象（宽，高，深度）
    let geometry = new THREE.CubeGeometry(this.cubeConfig.cubeWidth,this.cubeConfig.cubeHeight,this.cubeConfig.cubeDeep);
    // 创建材质（包括颜色，透明度等属性）
    let material = new THREE.MeshLambertMaterial({
        color:this.cubeConfig.cubeColor
    })
    // 几何对象和属性合并在一起
    let cube  = new THREE.Mesh(geometry,material);
    // 创建几何对象的位置
    if(this.cubes.length){
        // 从第二块开始随机左右方向出现
        cube.position.x = this.cubes[this.cubes.length - 1].position.x;
        cube.position.y = this.cubes[this.cubes.length - 1].position.y;
        cube.position.z = this.cubes[this.cubes.length - 1].position.z;
        // 要不左边要不右边
        this.cubeStart.nextDir = Math.random() > 0.5 ? "left" : "right";
        // 在左边改变x轴，否则y轴
        this.cubeStart.nextDir == 'left' ?
        cube.position.x = cube.position.x - Math.round(Math.random()*4 + 6):
        cube.position.z = cube.position.z - Math.round(Math.random()*4 + 6);
    }
    // 添加块
    this.cubes.push(cube);
    // 最多五个块，超过删除
    if(this.cubes.length > 5){
        this.scene.remove(this.cubes.shift());
    }
    // 添加到场景中
    console.log(this.scene,"this.scene")
    this.scene.add(cube);
    // 更新镜头位置
    // if(this.cubes.length > 1){
    //     console.log(cube.position.x,cube.position.z);
    // }
};