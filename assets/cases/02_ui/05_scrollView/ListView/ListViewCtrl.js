cc.Class({
    extends: cc.Component,

    properties: {
        itemTemplate: { // item template to instantiate other items
            default: null,
            type: cc.Node
        },
        scrollView: {
        	default: null,
        	type: cc.ScrollView
        },
        spawnCount: 0, // how many items we actually spawn
        totalCount: 0, // how many items we need for the whole list
        spacing: 0, // space between each item
        bufferZone: 0, // when item is away from bufferZone, we relocate it
        lblScrollEvent: cc.Label,
        btnAddItem: cc.Button,
        btnRemoveItem: cc.Button,
        btnJumpToPosition: cc.Button,
        lblJumpPosition: cc.Label,
        lblTotalItems: cc.Label,
    },

    // use this for initialization
    onLoad: function () {
    	this.content = this.scrollView.content;
        this.items = []; // array to store spawned items
    	this.initialize();
        this.updateTimer = 0;
        this.updateInterval = 0.2;
        this.lastContentPosY = 0; // use this variable to detect if we are scrolling up or down
    },

    initialize: function () {
        this.content.height = this.totalCount * (this.itemTemplate.height + this.spacing) + this.spacing; 
        // get total content height
    	for (let i = 0; i < this.spawnCount; ++i) { // spawn items, we only need to do this once
    		let item = cc.instantiate(this.itemTemplate);

    		this.content.addChild(item);

    		item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));

    		item.getComponent('Item').initItem(i, i);

            this.items.push(item);

            console.log(this.content.children)
    	}
    },

    getPositionInView: function (item) { // get item position in scrollview's node space
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = th0is.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },

    update: function(dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return; // we don't need to do the math every frame
        this.updateTimer = 0;


        let items = this.items;
        let buffer = this.bufferZone;
        let isDown = this.scrollView.content.y < this.lastContentPosY; // scrolling direction
        let offset = (this.itemTemplate.height + this.spacing) * items.length;
        /*
        for (let i = 0; i < items.length; ++i) {
            
            let viewPos = this.getPositionInView(items[i]);

            if (isDown) {
                // if away from buffer zone and not reaching top of content
                if (viewPos.y < -buffer && items[i].y + offset < 0) {
                    items[i].y = items[i].y + offset;
                    let item = items[i].getComponent('Item');
                    let itemId = item.itemID - items.length; // update item id
                    item.updateItem(itemId);
                }
            } else {
                // if away from buffer zone and not reaching bottom of content
                if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
                    items[i].y = items[i].y - offset;
                    let item = items[i].getComponent('Item');
                    let itemId = item.itemID + items.length;
                    item.updateItem(itemId);
                }
            }
        }
        */
        // update lastContentPosY
        //this.lastContentPosY = this.scrollView.content.y;
        //this.lblTotalItems.textKey = "Total Items: " + this.totalCount;

        //console.log(this.items)
    },

    scrollEvent: function(sender, event) {
        switch(event) {
            case 0: 
               this.lblScrollEvent.string = "Scroll to Top"; 
               break;
            case 1: 
               this.lblScrollEvent.string = "Scroll to Bottom"; 
               break;
            case 2: 
               this.lblScrollEvent.string = "Scroll to Left"; 
               break;
            case 3: 
               this.lblScrollEvent.string = "Scroll to Right"; 
               break;
            case 4: 
               this.lblScrollEvent.string = "Scrolling"; 
               break;
            case 5: 
               this.lblScrollEvent.string = "Bounce Top"; 
               break;
            case 6: 
               this.lblScrollEvent.string = "Bounce bottom"; 
               break;
            case 7: 
               this.lblScrollEvent.string = "Bounce left"; 
               break;
            case 8: 
               this.lblScrollEvent.string = "Bounce right"; 
               break;
            case 9: 
               this.lblScrollEvent.string = "Auto scroll ended"; 
               break;
        }
    },

    addItem: function() {
        this.content.height = (this.totalCount + 1) * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
        this.totalCount = this.totalCount + 1;
    },

    removeItem: function() {
        if (this.totalCount - 1 < 30) {
            cc.error("can't remove item less than 30!");
            return;
        }

        this.content.height = (this.totalCount - 1) * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
        this.totalCount = this.totalCount - 1;

        this.moveBottomItemToTop();
    },

    moveBottomItemToTop () {
        let offset = (this.itemTemplate.height + this.spacing) * this.items.length;
        let length = this.items.length;
        let item = this.getItemAtBottom();

        // whether need to move to top
        if (item.y + offset < 0) {
            item.y = item.y + offset;
            let itemComp = item.getComponent('Item');
            let itemId = itemComp.itemID - length;
            itemComp.updateItem(itemId);
        }
    },

    getItemAtBottom () {
        let item = this.items[0];
        for (let i = 1; i < this.items.length; ++i) {
            if (item.y > this.items[i].y) {
                item = this.items[i];
            }
        }
        return item;
    },

    scrollToFixedPosition: function () {
        this.scrollView.scrollToOffset(cc.v2(0, 500), 2);
    }
});
