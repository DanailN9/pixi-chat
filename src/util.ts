import * as PIXI from 'pixi.js'

export type TiledTexture = [
    [PIXI.Texture, PIXI.Texture, PIXI.Texture],
    [PIXI.Texture, PIXI.Texture, PIXI.Texture],
    [PIXI.Texture, PIXI.Texture, PIXI.Texture],
]

export const outputStorage: string[] = [];

export async function tileTexture(url: string, left: number, right: number, top: number, bottom: number): Promise<TiledTexture> {
    const part = PIXI.BaseTexture.from(url);

    await new Promise((res, reject) => {
        part.on('loaded', res);
        part.on('error', reject);
    })

    const lw = left;
    const cw = right - left;
    const rw = part.width - right;

    const th = top;
    const ch = right - left;
    const bh = part.height - bottom;


    return [
        [
            slice(part, 0, 0, lw, th),
            slice(part, left, 0, cw, th),
            slice(part, right, 0, rw, th),
        ],
        [
            slice(part, 0, top, lw, ch),
            slice(part, left, top, cw, ch),
            slice(part, right, top, rw, ch),
        ],
        [
            slice(part, 0, bottom, lw, bh),
            slice(part, left, bottom, cw, bh),
            slice(part, right, bottom, rw, bh),
        ],
    ]
}

export function createPanel(tiles, width: number, height: number) {
    const container = new PIXI.Container();

    //Corners
    const tl = new PIXI.Sprite(tiles[0][0]);
    const tr = new PIXI.Sprite(tiles[0][2]);
    const bl = new PIXI.Sprite(tiles[2][0]);
    const br = new PIXI.Sprite(tiles[2][2]);

    //Horyzontal Elements
    const t = new PIXI.Sprite(tiles[0][1]);
    const b = new PIXI.Sprite(tiles[2][1]);

    //Vertical Elements
    const l = new PIXI.Sprite(tiles[1][0]);
    const r = new PIXI.Sprite(tiles[1][2]);

    container.addChild(tl);
    container.addChild(tr);
    container.addChild(bl);
    container.addChild(br);

    if (width < (tl.width + tr.width)) {
        const half = width / 2;
        tl.width = half;
        tr.width = half;
        bl.width = half;
        br.width = half;
        l.width = half;
        r.width = half;
    }

    if (height < (tl.height + bl.height)) {
        const half = height / 2;
        tl.height = half;
        tr.height = half;
        bl.height = half;
        br.height = half;
        t.height = half;
        b.height = half;
    }

    tl.position.set(0, 0);
    tr.position.set(width - tr.width, 0);
    bl.position.set(0, height - bl.height);
    br.position.set(width - br.width, height - br.height)

    //Horyzontal
    if (width > (tl.width + tr.width)) {
        t.width = width - (tl.width + tr.width);
        b.width = width - (tl.width + tr.width);

        t.position.set(tl.width, 0);
        b.position.set(bl.width, height - b.height);

        container.addChild(t);
        container.addChild(b);
    }

    //Vertical
    if (height > (tl.height + bl.height)) {
        l.height = height - (tl.height + bl.height);
        r.height = height - (tr.height + br.height);

        l.position.set(0, tl.height);
        r.position.set(width - r.width, tr.height);

        container.addChild(l);
        container.addChild(r);
    }

    //Center
    if (width > (tl.width + tr.width) && height > (tl.height + bl.height)) {
        const c = new PIXI.Sprite(tiles[1][1]);
        c.width = width - (tl.width + tr.width);
        c.height = height - (tl.height + bl.height);

        c.position.set(tl.width, tl.height);

        container.addChild(c)

    }

    return container;


}


function slice(baseTexture, x, y, w, h) {
    return new PIXI.Texture(baseTexture, new PIXI.Rectangle(x, y, w, h))
}

export function submit(storage: string, container: string[]) {
    console.log(storage)
    container.push(storage);
    storage = '';
    console.log(storage)
}