export default class Keyboard {
	private keys: Set<string>;

	constructor() {
		this.keys = new Set();

		// Инициализация событий нажатия клавиш
		document.addEventListener('keydown', (event) => {
			this.keys.add(event.key);
		});

		// Инициализация событий отпускания клавиш
		document.addEventListener('keyup', (event) => {
			this.keys.delete(event.key);
		});
	}

	public isKeyPressed(key: string): boolean {
		return this.keys.has(key);
	}
}
