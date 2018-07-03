// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // 汽车参数
        resistance:20,//汽车阻力
        starSpeed:80,//起步速度
        maxSpeed:160,//最大速度
        brake:60,//刹车性能
        //
        road1:cc.Node,
        road2:cc.Node,
        road3:cc.Node,
        pointer:cc.Node,//时速表指针
        sf_left_hv:cc.SpriteFrame,//向左
        sf_right_hv:cc.SpriteFrame,//向右
        //控制节点
        up:cc.Node,//加速
        cat:cc.Node,//减速
        left:cc.Node,//向左
        right:cc.Node,//向右
        
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.speed = 0;//车速
        this.isUp = false;//是否加速
        this.isCat = false;//是否加速
        this.isInit = false;//初始化是否完成
        this.isStart = true;//游戏是否开始

        this.state = 1;//1为向前，2为向左，3为向右
    },
    start () {
        var roads = this.node.parent.parent.getChildByName("ent").getChildByName("roads");
        this.road1 = roads.getChildByName("road1");
        this.road2 = roads.getChildByName("road2");
        this.road3 = roads.getChildByName("road3");
        this.car = this.node.getChildByName("car");
        this.speed_ometer = this.node.getChildByName("speedometer");
        this.sf_left = this.left.getComponent(cc.Sprite).spriteFrame;
        this.sf_right = this.right.getComponent(cc.Sprite).spriteFrame;
        this.init();
    },
    init () {
        this.up.on("touchstart",e=>{this.isUp = true});
        this.cat.on("touchstart",e=>{this.isCat = true});
        this.left.on("touchstart",e=>{this.Left()});
        this.right.on("touchstart",e=>{this.Right()});
        this.node.parent.on("touchend",e=>{
            this.isUp = false;
            this.isCat = false;
            this.state = 1;
            this.left.getComponent(cc.Sprite).spriteFrame = this.sf_left;
            this.right.getComponent(cc.Sprite).spriteFrame = this.sf_right;
            this.car.rotation = 0;
        });
        this.isInit = true;
        var action1 = cc.moveTo(0.5, 0, 240);
        var action2 = cc.moveTo(0.5, 0, -47);
        this.car.runAction(action1);
        this.speed_ometer.runAction(action2);
    },

    update (dt) {
        this.Run(dt);
    },
    //行驶
    Run(dt){
        if(this.isInit && this.isStart){
            this.SpeedUp(dt);
            this.SpeedCat(dt);
            this.speed -= this.resistance * dt;//减去阻力
            this.Speedometer();
            if(this.speed <= 0){
                this.speed = 0;
            }
            var journey = this.speed * dt * 20;//路程
            if(this.state == 2){
                this.car.x -= journey*0.3;
            }
            if(this.state == 3){
                this.car.x += journey*0.3;
            }
            this.road1.y -= journey;
            this.road3.y -= journey;
            this.road2.y -= journey;
            if(this.road1.y <= -1133){
                this.road1.y = 2266;
                this.road2.y = 0;
                this.road3.y = 1133;
            }
            
            if(this.road2.y <= -1133){
                this.road1.y = 1133;
                this.road2.y = 2266;
                this.road3.y = 0;
            }
            
            if(this.road3.y <= -1133){
                this.road1.y = 0;
                this.road2.y = 1133;
                this.road3.y = 2266;
            }
        }
        
        
        
    },
    //加速
    SpeedUp(dt){
        if(this.isUp){
            this.speed += this.starSpeed * dt;
            if(this.speed >= this.maxSpeed){
                this.speed = this.maxSpeed;
            }
        }
        
    },
    //减速
    SpeedCat(dt){
        if(this.isCat){
            this.speed -= this.brake * dt;
        }
    },
    // 时速表
    Speedometer(){
        var rote = (this.speed/this.maxSpeed*260)-130;
        this.pointer.rotation = rote;
    },
    //向左
    Left(){
        if(this.state == 1 && this.speed > 0){
            this.state = 2;
            this.left.getComponent(cc.Sprite).spriteFrame = this.sf_left_hv;
            this.car.rotation = -45;
        }
    },
    //右
    Right(){
        if(this.state == 1 && this.speed > 0){
            this.state = 3;
            this.right.getComponent(cc.Sprite).spriteFrame = this.sf_right_hv;
            this.car.rotation = 45;
        }
    },
    
});
