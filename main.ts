function spawnBirds (foodCount: number) {
    for (let index = 0; index <= foodCount; index++) {
        bird = sprites.create(img`
            ....fffffff........fff..
            ....ffddddff......ffdf..
            ...ffffedddffffffffddf..
            ..ffddeeeeeeeedddddddf..
            .ffd1eeeeeeeeeeddddddff.
            ffd111eeeeeeeeeeeedeeeff
            fdeef1deeeeeeeeeeeeeeeef
            deeeedd11eeeeeeeeeddddef
            feeeeeef11eeeedddddddddf
            ffeeeeeeeeeeedeeedffffff
            .fffeeeeeeedeeeeeefff...
            ...ffffffffffeeeeeeff...
            ............ffeeeeeef...
            ............fffeeeeef...
            ..............fffffff...
            ........................
            `, SpriteKind.Enemy)
        bird.setBounceOnWall(true)
        tiles.placeOnRandomTile(bird, sprites.castle.tilePath5)
        bird.setVelocity(100, 0)
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    transformSprites.rotateSprite(mySprite, 0)
})
function spawnFood (foodCount: number) {
    for (let index = 0; index <= foodCount; index++) {
        snakeFood = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 6 6 6 6 . . . . . . 
            . . . . 6 6 6 5 5 6 6 6 . . . . 
            . . . 7 7 7 7 6 6 6 6 6 6 . . . 
            . . 6 7 7 7 7 8 8 8 1 1 6 6 . . 
            . . 7 7 7 7 7 8 8 8 1 1 5 6 . . 
            . 6 7 7 7 7 8 8 8 8 8 5 5 6 6 . 
            . 6 7 7 7 8 8 8 6 6 6 6 5 6 6 . 
            . 6 6 7 7 8 8 6 6 6 6 6 6 6 6 . 
            . 6 8 7 7 8 8 6 6 6 6 6 6 6 6 . 
            . . 6 8 7 7 8 6 6 6 6 6 8 6 . . 
            . . 6 8 8 7 8 8 6 6 6 8 6 6 . . 
            . . . 6 8 8 8 8 8 8 8 8 6 . . . 
            . . . . 6 6 8 8 8 8 6 6 . . . . 
            . . . . . . 6 6 6 6 . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Food)
        tiles.placeOnRandomTile(snakeFood, sprites.castle.tilePath5)
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    transformSprites.rotateSprite(mySprite, -90)
})
function initTail () {
    tail = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 6 6 6 6 6 6 6 6 . . . . 
        . . . . 6 6 6 6 6 6 6 6 . . . . 
        . . . 6 6 6 6 6 6 6 6 6 6 . . . 
        . . 6 6 6 6 6 6 6 6 6 6 6 6 . . 
        . . 6 6 6 6 6 6 6 6 6 6 6 6 . . 
        . . . 6 6 6 6 6 6 6 6 6 6 . . . 
        . . . 6 6 6 6 6 6 6 6 6 6 . . . 
        . . . 6 6 6 6 6 6 6 6 6 6 . . . 
        . . . . 6 6 6 6 6 6 6 6 . . . . 
        . . . . 6 6 6 6 6 6 6 6 . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    tail.follow(mySprite, 100)
    lastTail = tail
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    transformSprites.rotateSprite(mySprite, 90)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    transformSprites.rotateSprite(mySprite, 180)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    newTail()
})
function newTail () {
    tail = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 6 6 6 6 6 6 6 6 . . . . 
        . . . . 6 6 6 6 6 6 6 6 . . . . 
        . . . 6 6 6 6 6 6 6 6 6 6 . . . 
        . . 6 6 6 6 6 6 6 6 6 6 6 6 . . 
        . . 6 6 6 6 6 6 6 6 6 6 6 6 . . 
        . . . 6 6 6 6 6 6 6 6 6 6 . . . 
        . . . 6 6 6 6 6 6 6 6 6 6 . . . 
        . . . 6 6 6 6 6 6 6 6 6 6 . . . 
        . . . . 6 6 6 6 6 6 6 6 . . . . 
        . . . . 6 6 6 6 6 6 6 6 . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    tail.setPosition(mySprite.x - randint(10, 30), mySprite.y + randint(10, 30))
    tail.follow(lastTail, 100)
    lastTail = tail
}
let lastTail: Sprite = null
let tail: Sprite = null
let snakeFood: Sprite = null
let bird: Sprite = null
let mySprite: Sprite = null
tiles.setTilemap(tilemap`level1`)
mySprite = sprites.create(transformSprites.scale2x(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . 6 6 6 2 2 6 6 6 . . . . 
    . . . . 6 6 6 2 2 6 6 6 . . . . 
    . . . 6 6 6 1 6 6 1 6 6 6 . . . 
    . . 6 6 6 6 6 6 6 6 6 6 6 6 . . 
    . . 6 6 6 6 6 6 6 6 6 6 6 6 . . 
    . . . 6 6 6 6 6 6 6 6 6 6 . . . 
    . . . 6 6 6 6 6 6 6 6 6 6 . . . 
    . . . 6 6 6 6 6 6 6 6 6 6 . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `), SpriteKind.Player)
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
initTail()
spawnBirds(4)
game.onUpdateInterval(500, function () {
    if (sprites.allOfKind(SpriteKind.Food).length < 4) {
        spawnFood(10)
    }
})
