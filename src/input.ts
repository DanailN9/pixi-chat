import { Container, DisplayObject, Text, TextStyle } from "pixi.js";
import { outputStorage } from "./util";

export const style = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff,
    align: "center"
})

export let storage: { content: string } = {
    content: '',
}

export class InputField extends Container {
    private text: Text;

    constructor(
        private element: DisplayObject,
    ) {
        super()

        this.addChild(element);

        this.text = new Text('', style);
        this.text.anchor.set(0, 0.5);
        this.text.position.set(20, this.height / 2);
        this.addChild(this.text);

        document.addEventListener('keydown', this.onKeydown.bind(this));
    }

    private onKeydown(key) {
        if (key.code === 'Backspace') {
            storage.content = storage.content.substring(0, storage.content.length - 1);

        } else if (key.code === 'Enter' && storage.content !== '') {
            outputStorage.push(storage.content);
            storage.content = '';
        }
        else if (key.keyCode >= 48 && key.keyCode <= 90 || key.keyCode >= 96 && key.keyCode <= 111 || key.keyCode === 32) {
            storage.content += key.key;
            console.log(key.key);

        }
        this.text.text = storage.content;
    }


}