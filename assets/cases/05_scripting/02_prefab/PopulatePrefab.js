cc.Class({
    extends: cc.Component,

    properties: {
        root: {
            default: null,
            type: cc.Node
        },
        prefab: {
            default: null,
            type: cc.Prefab
        },
        canvas: {
            default: null,
            type: cc.Canvas
        },
        numberToSpawn: 0,
        spawnInterval: 0
    },
    
    addSpawn: function () {
        if (this.spawnCount >= this.numberToSpawn) {
            this.clearRepeater();
            return;
        }
        var monster = cc.instantiate(this.prefab);
        monster.parent = this.root;
        //this.canvas.node.addChild(monster);
        monster.position = this.getRandomPosition();
        this.spawnCount++;
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        cc.log(self)
        self.randomRange = cc.v2(300, 200);
        self.spawnCount = 0;
        self.schedule(self.addSpawn, self.spawnInterval);
    },

    getRandomPosition: function() {
        return cc.v2((Math.random() - 0.5) * 2 * this.randomRange.x, (Math.random() - 0.5) * 2 * this.randomRange.y);
    },

    clearRepeater: function() {
        this.unschedule(this.addSpawn);
    },
});
