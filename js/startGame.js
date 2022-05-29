
  // 开始游戏按钮
  
  function startGame(){
    let bodyDom = document.body;
    const _this = this;
    let soreDom = document.getElementsByClassName("score-content");
    soreDom[0].style.display = 'none';
    this.handleMouseDown = handleMouseDown;
    this.handleMouseUp = handleMouseUp;
    // 鼠标按下事件
    bodyDom.onmousedown = function(){
      handleMouseDown.call(_this)
      // _this.handleMouseDown()
    };
    // 鼠标松开事件
    bodyDom.onmouseup = function(){
      handleMouseUp.call(_this)
      // _this.handleMouseUp()
    };
  }
  // function restartGame(){
  //   this.init();
  //   this.startGame();
  // }
  