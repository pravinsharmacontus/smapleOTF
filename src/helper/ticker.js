import { useEffect, useState } from "react";

class Scroller {
	constructor(canvas, options = {}) {
		console.log(canvas, "canvascanvascanvas");
		this.canvas = canvas;
		this.canvas.width = options.width ? options.width : 1860;
		this.canvas.height = options.height ? options.height : 100;
		this.context = this.canvas.getContext('2d');
		this.context.fillStyle = "blue";
		this.context.fill();
		this.options = { ...options };
		this.ratio = window.devicePixelRatio || 1;
		this.textHeight = this.measureFontHeight().height;
		this.yloc = 0;
		this.xloc = this.canvas.width;
		this.animId = "";
		this.init();
	}

	get getDefaultOptions() {
		return {
			text: 'Ok, this is the default text',
			speed: 1,
			color: 'pink',
			font: '5rem Arial',
			padding: 20,
		};
	}
	init() {

		this.context.font = this.options.font;
		this.textWidth = this.context.measureText(this.options.text).width + this.options.padding;
		this.duplicator = Math.ceil(this.canvas.width / this.textWidth) + 1;
		this.x = [];
		console.log("init()", "showTicker 5");

		for (let i = 0; i < this.duplicator; i += 1) {
			const pos = (i * this.textWidth) + (this.options.padding * (i + 1)) + this.canvas.width;
			this.x.push(pos);

			if (i === 1) { this.originalX = pos; }
		}
	}
	animate() {
		this.animId = requestAnimationFrame(() => { this.animate(); });
		this.x.forEach((el, i) => {
			if (this.textWidth + this.x[i] < 0) {
				this.x[i] = (this.textWidth * (this.duplicator - 1)) + (this.options.padding * (this.duplicator + 1));
			} else {
				this.x[i] -= this.options.speed;
			}
		});

		this.drawText();
	}

	setFont() {
		this.context.font = this.options.font;
		this.context.fillStyle = this.options.textColor;
		this.context.textAlign = 'left';
		this.context.textBaseline = 'top';
	}

	drawText() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.fillStyle = this.options.backgroundColor;
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.setFont();
		for (let i = 0; i < this.duplicator; i += 1) {
			this.context.fillText(this.options.text, this.x[i], this.yloc);
		}

	}
	measureFontHeight() {
		this.setFont();
		this.context.fillText(this.options.text, 0, 0);
		const data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height).data;

		let firstY = -1;
		let lastY = -1;

		// loop through each row
		for (let y = 0; y < this.canvas.height; y++) {
			// loop through each column
			for (let x = 0; x < this.canvas.width; x++) {
				const alpha = data[((this.canvas.width * y) + x) * 4 + 3];

				if (alpha > 0) {
					firstY = y;
					break;
				}
			}

			if (firstY >= 0) break;
		}

		// loop through each row, this time beginning from the last row
		for (let y = this.canvas.height; y > 0; y--) {
			// loop through each column
			for (let x = 0; x < this.canvas.width; x++) {
				const alpha = data[((this.canvas.width * y) + x) * 4 + 3];
				if (alpha > 0) {
					lastY = y;
					// exit the loop
					break;
				}
			}

			if (lastY >= 0) break;
		}

		return {
			height: lastY - firstY,
			firstPixel: firstY,
			lastPixel: lastY
		};

	}
}

export function record(canvas, time) {
	const recordedChunks = [];
	return new Promise(function (res, rej) {
		const stream = canvas.captureStream(25 /*fps*/);
		const mediaRecorder = new MediaRecorder(stream, {
			mimeType: "video/webm; codecs=vp9"
		});
		//ondataavailable will fire in interval of `time || 4000 ms`
		mediaRecorder.start(time || 4000);
		mediaRecorder.ondataavailable = function (event) {
			recordedChunks.push(event.data);
			// after stop `dataavilable` event run one more time
			if (mediaRecorder.state === 'recording') {
				mediaRecorder.stop();
			}

		};
		mediaRecorder.onstop = function (event) {
			const blob = new Blob(recordedChunks, { type: "video/webm" });
			const url = URL.createObjectURL(blob);
			res(url);
		};
	});
}
export const showTicker = (tickerText = "") => {
	console.log("tickerText ", "showTicker()", "showTicker 1");
	const canvas = document.createElement("canvas");
	const scroller = new Scroller(canvas, {
		text: tickerText,
		speed: 2,
		textColor: 'white',
		font: '5rem Arial',
		padding: 200,
		backgroundColor: "red"
	});
	scroller.animate();
};
const ShowTickerBycanvas = (props = {}) => {
	const { tickerText = "", width = 1000, height = 30, font = 16 } = props;
	const [getWidth, setWidth] = useState(1000);
	const [getHeight, setHeight] = useState(30);
	const [getfont, setfont] = useState(16);
	useEffect(() => {
		setWidth(width);
		setHeight(height);
		setfont(font);
		const canvas = document.getElementById("canvas");
		if (canvas) {
			const scroller = new Scroller(canvas, {
				text: tickerText,
				speed: 2,
				textColor: 'white',
				font: `${getfont}px ProximaNovaRegular`,
				padding: 200,
				backgroundColor: "#FC0E35",
				width: getWidth,
				height: getHeight
			});
			scroller.animate();
		}
		else {
			console.warn(canvas, "canvas ele");
		}
	}, [width, height]);
	return (<canvas id="canvas"></canvas>);
};

export default ShowTickerBycanvas;
