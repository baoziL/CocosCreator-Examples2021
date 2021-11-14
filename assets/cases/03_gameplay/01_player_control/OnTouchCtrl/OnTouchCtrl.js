const i18n = require('i18n');

cc.Class({
    extends: cc.Component,

    properties: {
        canvas: cc.Node,
        touchLocationDisplay: {
            default: null,
            type: cc.Label
        },
        follower: {
            default: null,
            type: cc.Node
        },
        followSpeed: 200
    },

    // use this for initialization
    onLoad: function () {
        console.log("test")
        var self = this;
        self.moveToPos = cc.v2(0, 0);
        self.isMoving = false;
        self.canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            self.isMoving = true;
            self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);
            self.touchLocationDisplay.textKey = i18n.t("cases/03_gameplay/01_player_control/On/OnTouchCtrl.js.1") + Math.floor(touchLoc.x) + ', ' + Math.floor(touchLoc.y) + ')';
        }, self.node);
        self.canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);
            self.touchLocationDisplay.textKey = i18n.t("cases/03_gameplay/01_player_control/On/OnTouchCtrl.js.1") + Math.floor(touchLoc.x) + ', ' + Math.floor(touchLoc.y) + ')';
        }, self.node);
        self.canvas.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.isMoving = false; // when touch ended, stop moving
        }, self.node);
    },

    // called every frame
    update: function (dt) {
        if (!this.isMoving) return;
        var oldPos = this.follower.position;
        //console.log("oldPos")
        //console.log(oldPos)
        // get move direction
        var direction = this.moveToPos.sub(oldPos).normalize();
        console.log("moveToPos-----------")
        console.log(this.moveToPos)
        console.log(oldPos)
        console.log(this.moveToPos.sub(oldPos))
        console.log(this.moveToPos.sub(oldPos).normalize())
        console.log("moveToPos-----------")
        //console.log(direction)
        // multiply direction with distance to get new position
        var newPos = oldPos.add(direction.mul(this.followSpeed * dt));
        //console.log("newPos")
        //console.log(newPos)
        // set new position
        this.follower.setPosition(newPos);
    }
});
