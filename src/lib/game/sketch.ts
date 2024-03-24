import { writable } from 'svelte/store';

export interface SketchControls {
	fps: (frames: number) => void;
	play: () => void;
	pause: () => void;
	background: (hex: number) => void;
	changeWidth: (width: number) => void;
}

export const isPlaying = writable(true);

// recommended by p5 example to avoid stuttering
export const DEFAULT_FPS = 10;
export const fps = writable(DEFAULT_FPS);

// store to expose the sketch/p5 controls
export const storeSketchControls = writable<SketchControls>({
	fps: () => {},
	play: () => {},
	pause: () => {},
	background: () => {},
	changeWidth: () => {}
});
