export default class Keyboard {
	private keys: Set<string>;

	constructor() {
		this.keys = new Set();

		// Инициализация событий нажатия клавиш
		document.addEventListener('keydown', (event) => {
			this.keys.add(event.code);
		});

		// Инициализация событий отпускания клавиш
		document.addEventListener('keyup', (event) => {
			this.keys.delete(event.code);
		});
	}

	public isKeyPressed(key: string): boolean {
		return this.keys.has(key);
	}
}
