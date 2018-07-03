// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

module.exports = cc.Class({
    extends: cc.Component,

    properties: {
        player:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.loader.loadRes("car_ysc/prefers/cars/car_ysc_car1",cc.Prefab,(e,res)=>{
            if(res){
                this.car = cc.instantiate(res);
                this.player.addChild(this.car);
                this.init();
            }
        });
    },

    init () {
        
    },

    // update (dt) {

    // },
});
