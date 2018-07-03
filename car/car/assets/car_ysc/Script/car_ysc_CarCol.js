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
        starSpeed:40,//起步速度
        maxSpeed:160,//最大速度
        //
        road1:cc.Node,
        road2:cc.Node,
        road3:cc.Node,
        //控制节点
        up:cc.Node,
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.speed = 0;//车速
        this.isUp = false;//是否加速
    },

    start () {
        this.up.on("touchstart",e=>{this.isUp = true});
        this.node.parent.on("touchend",e=>{this.isUp = false});
    },

    update (dt) {
        this.Run(dt);
    },
    //行驶
    Run(dt){
        this.SpeedUp(dt);
        this.speed -= this.resistance * dt;//减去阻力
        if(this.speed <= 0){
            this.speed = 0;
        }
        var journey = this.speed * dt * 20;//路程
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
            this.speed -= this.starSpeed * dt;
        }
    }
});
