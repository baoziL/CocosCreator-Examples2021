cc.Class({
    extends: cc.Component,

    properties: {
        hp: 0,
        emissionRate: 0,
        num: 0,
        hpBar: cc.ProgressBar,
        particle: cc.ParticleSystem,
        score: cc.Label
    },

    update: function (dt) {
        console.log(this.hp)
        console.log(this.emissionRate)
        console.log(this.num)
        this.hpBar.progress = this.hp;
        this.particle.emissionRate = this.emissionRate;

        
        this.score.string = Math.ceil(this.num);
    }
});
