import * as PIXI from 'pixi.js';
import { BLEND_MODES, Container, Graphics, Texture } from 'pixi.js';
import { Button } from './button';
import { InputField } from './input';
import { OutputField } from './output';
import { createPanel, tileTexture } from './util';

const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x4472c4
})



document.body.appendChild(app.view as HTMLCanvasElement);

app.ticker.add(update);

function update() {
}


init()

async function init() {
    const hover = await tileTexture('assets/hover.png', 25, 105, 25, 105);
    const inset = await tileTexture('assets/inset.png', 25, 105, 25, 105);
    const bevel = await tileTexture('assets/bevel.png', 25, 105, 25, 105);

    const orange = createPanel(hover, 150, 50);
    const blue = createPanel(bevel, 150, 50);
    const presed = createPanel(inset, 150, 50)

    const button = new Button('Send', onClick, blue, orange, presed);

    const outputTexture = createPanel(inset, 750, 475);
    const inputTexture = createPanel(inset, 575, 50);

    const input = new InputField(inputTexture);
    const output = new OutputField(outputTexture)

    input.position.set(25, 525);
    output.position.set(25, 25);
    button.position.set(625, 525);

    app.stage.addChild(button);
    app.stage.addChild(output);
    app.stage.addChild(input);

    function onClick() {

    }

}
