import { Container, DisplayObject, Text, TextStyle } from "pixi.js";
import { storage } from "./input";
import { outputStorage } from "./util";

const style = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff,
    align: "center"
})

export class Button extends Container {
    private _label: string;
    private text: Text;

    constructor(
        label: string,
        private callback: () => void,
        private firstElement: DisplayObject,
        private highlight: DisplayObject,
        private clicked: DisplayObject,
    ) {
        super()

        this.addChild(this.firstElement, this.highlight, this.clicked);
        this.highlight.renderable = false;
        this.clicked.renderable = false;



        this.label = label;
        this.text = new Text(label, style);
        this.text.anchor.set(0.5, 0.5);
        this.text.position.set(this.width / 2, this.height / 2)
        this.addChild(this.text);

        this.interactive = true;
        this.on('mouseenter', this.onEnter.bind(this));
        this.on('mouseleave', this.onLeave.bind(this));
        this.on('pointertap', this.pointerTap.bind(this));
    }

    get label() {
        return this._label;
    }

    set label(value: string) {
        this._label = value;

    }

    private onEnter() {
        this.firstElement.renderable = false;
        this.highlight.renderable = true;
        this.clicked.renderable = false;
    }

    private onLeave() {
        this.firstElement.renderable = true;
        this.highlight.renderable = false;
        this.clicked.renderable = false;
    }

    private pointerTap() {
        if (storage.content !== '') {
            outputStorage.push(storage.content as string);
            storage.content = '';
            console.log(outputStorage)
        }
    }
}