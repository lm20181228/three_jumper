// 鼠标按下事件
function handleMouseDown(){
    console.log(this,"this")
    if(!this.jumperStart.ready && this.jumper.scale.y > 0.02){
        this.jumper.scale.y -= 0.01;//压缩块
        this.jumperStart.xSpeed += 0.004;
        this.jumperStart.ySpeed += 0.008;
        // 重新渲染画布
        this.render();
        requestAnimationFrame(()=>{
            this.handleMouseDown()
        })
    }
}
// 鼠标松开事件
function handleMouseUp(){
   this.jumperStart.ready = true;
   if(this.jumper.position.y >= 1){
    //    压缩状态小于1就+
    if(this.jumper.scale.y < 1){
        this.jumper.scale.y += 0.1;
    }
    // 判断跳块落地点
    if(this.cubeStart.nextDir == 'left'){
        this.jumper.position.x -= this.jumperStart.xSpeed;
    }else{
        this.jumper.position.z -= this.jumperStart.xSpeed;
    }
    this.jumper.position.y += this.jumperStart.ySpeed;
    // 上升落下状态
    this.jumperStart.ySpeed -= 0.01;
    // 更新画布
    this.render();
    // 循环执行
    requestAnimationFrame(()=>{
        this.handleMouseUp();
    })
   }else{
    //    落下状态
    this.jumperStart.ready = false;
    this.jumperStart.xSpeed = 0;
    this.jumperStart.ySpeed = 0;
    this.jumper.position.y = 1;
    this.jumper.scale = 1;
    // 检测落下点在哪里
    checkInCube.call(this);
    // checkInCube();
    // 下落正确之后，分数+1
    if(this.falledStart.location == 1){
        this.score++;
        // 更新块和相机位置
        if(this.cubeStart.nextDir == 'left'){
            this.cameraConfig.position.x =this.jumper.position.x;
        }else{
            this.cameraConfig.position.z =this.jumper.position.z + 10;  
        }
        // this.createCube.call(this);
        // this.updateCamera.call(this);
        this.createCube();
        this.updateCamera();
        if(this.successCallback){
            // 成功函数回调
            this.successCallBack(this.score);
        }
    }else{
        // 失败回调
        handleMouseOff();
        falling.call(this);
    }
   }
}
// 检测落地点
function checkInCube(){
    // 当前盒子距离 下一个和盒子距离
    let distanceCur,distanceNext;
    let should = (this.config.jumperWidth + this.cubeConfig.cubeWidth) /2;
    // 判断方向
    if(this.cubeStart.nextDir == 'left'){
        distanceCur = Math.abs(this.jumper.position.x - this.cubes[this.cubes.length - 2].position.x);
        distanceNext = Math.abs(this.jumper.position.x - this.cubes[this.cubes.length - 1].position.x);
    }else{
        distanceCur = Math.abs(this.jumper.position.z - this.cubes[this.cubes.length - 2].position.z);
        distanceNext = Math.abs(this.jumper.position.z - this.cubes[this.cubes.length - 1].position.z);
    }
    console.log(should,"should",distanceCur,"distanceCur",distanceNext,"distanceNext")
    if(distanceCur < should){
        // 落在当前块上
        console.log("当前块")
        this.falledStart.distance = distanceCur;
        this.falledStart.location = distanceCur < this.cubeConfig.cubeWidth / 2 ? -1 : -10;
    }else if(distanceNext < should){
        // 落在下一个块上
        console.log("下一块啊")
        this.falledStart.distance = distanceNext;
        this.falledStart.location = distanceNext < this.cubeConfig.cubeWidth / 2 ? 1 : 10;
    }else if(distanceNext > should){
        // 落在下一个块上
        console.log("超越下一块啊")
        this.falledStart.distance = distanceNext;
        this.falledStart.location = distanceNext < this.cubeConfig.cubeWidth / 2 ? 1 : 10;
    }else{
        console.log("中间")
        // 落在中间
        this.falledStart.location = 0;
    }
}

// 失败下落过程
function falling(){
    // 失效点击事件
    if(this.falledStart.location == 10){
        // 从下一个盒子落下
        if(this.cubeStart.nextDir == 'left'){
            // 判断方向
            if(this.jumper.position.x > this.cubes[this.cubes.length - 1].position.x){
                _fallingRotate("leftBottom");
            }else{
                _fallingRotate("leftTop");
            }
        }else{
            // 右方向
            if(this.jumper.position.z - this.cubes[this.cubes.length - 1].position.z){
                _fallingRotate("rightBottom");
            }else{
                _fallingRotate("rightTop");
            }
        }
    }else if(this.falledStart.location == -10){
        // 从当前盒子落下
        if(this.cubeStart.nextDir == "left"){
            _fallingRotate("leftTop");
        }else{
            _fallingRotate("rightTop");
        }
    }else if(this.falledStart.location == 0){
        _fallingRotate("none")
    }
}
// 下落转体动画
function _fallingRotate(){
    
}
// 解除鼠标绑定事件
function handleMouseOff(){
    // 重置鼠标事件
    let bodyDom = document.body;
     // 鼠标按下事件
    bodyDom.onmousedown = function(){
    };
    // 鼠标松开事件
    bodyDom.onmouseup = function(){
    };
    let soreDom = document.getElementsByClassName("score-content");
    soreDom[0].style.display = 'flex';
}