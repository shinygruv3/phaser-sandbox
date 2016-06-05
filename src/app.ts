/// <reference path="./ref.d.ts"/>
enum Direction {
    up = 0,
    down,
    left,
    right
}

interface DirectionToKeysMap {
    [direction: number]: number[];
}

class PhaserSandbox {
    private static dimensions: any = { width: 800, height: 600 };
    private game: Phaser.Game;
    private runningMan: Phaser.Sprite;
    private directionMap: DirectionToKeysMap;

    constructor() {
        this.directionMap = {};
        this.directionMap[Direction.up] = [Phaser.Keyboard.UP, Phaser.Keyboard.W];
        this.directionMap[Direction.down] = [Phaser.Keyboard.DOWN, Phaser.Keyboard.S];
        this.directionMap[Direction.left] = [Phaser.Keyboard.LEFT, Phaser.Keyboard.A];
        this.directionMap[Direction.right] = [Phaser.Keyboard.RIGHT, Phaser.Keyboard.D];
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
        const maxWidth = PhaserSandbox.dimensions.width - this.runningMan.width / 2;
        const maxHeight = PhaserSandbox.dimensions.height - this.runningMan.height / 2;
        if (this.isDirectionKeyPressed(Direction.left)) {
            if (this.runningMan.x <= this.runningMan.width / 2) {
                this.runningMan.x = this.runningMan.width / 2;
            }
            this.runningMan.x -= 5;
        } else if (this.isDirectionKeyPressed(Direction.right)) {
            if (this.runningMan.x >= maxWidth) {
                this.runningMan.x = maxWidth;
            }
            this.runningMan.x += 5;
        }

        if (this.isDirectionKeyPressed(Direction.up)) {
            if (this.runningMan.y - this.runningMan.height / 2 <= 0) {
                this.runningMan.y = this.runningMan.height / 2;
            }
            this.runningMan.y -= 5;
        } else if (this.isDirectionKeyPressed(Direction.down)) {
            if (this.runningMan.y >= maxHeight) {
                this.runningMan.y = maxHeight;
            }
            this.runningMan.y += 5;
        }
    };

    public render = () => {
        this.game.debug.spriteInfo(this.runningMan, 20, 32);
    };

    private isDirectionKeyPressed = (direction:Direction) : boolean => {
        const directionKeys = this.directionMap[direction];
        let wasFound = false;
        directionKeys.forEach((directionKey:number) => {
            if (this.game.input.keyboard.isDown(directionKey)) {
                wasFound = true;
                return;
            }
        });

        return wasFound;

    };
}

window.onload = () => {
    var game = new PhaserSandbox();
};