cc.Class({
    extends: cc.Component,

    properties: {
        prefab: cc.Prefab,
        canvas:cc.Node,
    },

    // use this for initialization
    onLoad: function () {

        this.node.on(cc.Node.EventType.TOUCH_END, function () {

            //var canvasParent = this.canvas.parent;

            var newnode = cc.instantiate(this.prefab);

            var parent = this.node.parent;

            this.node.parent = null;

            newnode.parent = parent;

            cc.log(this.node.parent)
            

            

            //cc.log(this.canvasParent)

            //cc.log(this.canvasParent.children)

        }, this);
    }
});
