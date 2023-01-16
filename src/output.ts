import { Container, DisplayObject, Text, TextStyle } from "pixi.js";
import { style } from "./input";
import { outputStorage } from "./util";

let index = 0;
let pos = 20;

export class OutputField extends Container {
    private text: Text;

    constructor(
        private element: DisplayObject,
    ) {
        super()

        this.addChild(element);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.text = new Text(outputStorage[index], style);
                this.text.anchor.set(0, 0.1);
                this.text.position.set(25, pos);
                this.addChild(this.text);

                console.log(outputStorage)
                index++;
                pos += 20;
            }
        })
    }
}