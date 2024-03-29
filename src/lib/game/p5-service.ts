// P5Service.ts
import { type p5 } from 'p5-svelte';
import { writable } from 'svelte/store';

export interface P5Interface {
	setup: (p5: p5) => void;
	draw: () => void;
	changeBackground: (color: number) => void;
	changeFrameRate: (fps: number) => void;
}

export class P5Service implements P5Interface {
	// thanks claude3 for the suggestion
	private p5Instance: p5;

	constructor(p5: p5) {
		this.p5Instance = p5;
	}

	setup(p5: p5) {
		p5.createCanvas(400, 400);
	}

	draw() {
		this.p5Instance.background(255);
	}

	play() {
		console.log('play');
		console.log(this.p5Instance.loop);
		this.p5Instance.loop();
	}

	pause() {
		this.p5Instance.noLoop();
	}

	changeBackground(color: number) {
		this.p5Instance.background(color);
	}

	changeFrameRate(fps: number) {
		this.p5Instance.frameRate(fps);
	}
}

// null because of course
export const p5_service_store = writable<P5Service | null>(null);
