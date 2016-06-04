/// <reference path="./ref.d.ts"/>

class PhaserSandbox {
    private static dimensions: any = { width: 800, height: 600 };
    private game: Phaser.Game;
    private runningMan: Phaser.Sprite;

    constructor() {
        this.game = new Phaser.Game(PhaserSandbox.dimensions.width, 
            PhaserSandbox.dimensions.height, 
            Phaser.CANVAS, 
            "content", 
            { 
                preload: this.preload,
                create: this.create,
                update: this.update,
                render: this.render
            });
    }

    public preload = () => {
        this.game.load.atlasJSONHash("bot", "sprites/running_bot.png", "sprites/running_bot.json");
    };

    public create = () => {
        this.runningMan = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "bot");
        this.runningMan.anchor.setTo(0.5, 0.5);
        this.runningMan.scale.setTo(2, 2);
        this.runningMan.animations.add("run");
        this.runningMan.animations.play("run", 10, true);
    };

    public update = () => {
        const maxWidth = PhaserSandbox.dimensions.width - this.runningMan.width;
        const maxHeight = PhaserSandbox.dimensions.height - this.runningMan.height;
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            if (this.runningMan.x <= this.runningMan.width) {
                this.runningMan.x = this.runningMan.width;
            }
            this.runningMan.x -= 4;
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            if (this.runningMan.x >= maxWidth) {
                this.runningMan.x = maxWidth;
            }
            this.runningMan.x += 4;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            if (this.runningMan.y <= 0) {
                this.runningMan.y = 0;
            }
            this.runningMan.y -= 4;
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            if (this.runningMan.y >= maxHeight) {
                this.runningMan.y = maxHeight;
            }
            this.runningMan.y += 4;
        }
    };

    public render = () => {
        this.game.debug.spriteInfo(this.runningMan, 20, 32);
    };
}

window.onload = () => {
    var game = new PhaserSandbox();
};