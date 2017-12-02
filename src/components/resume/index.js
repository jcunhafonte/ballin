import { Component } from 'preact';
import style from './style';
import Square from '../square/index';

export default class Resume extends Component {
	_handleKeyDown(event) {
		if (event.keyCode === 32) this.props.onFinish();
	}

	_rotateSquare() {
	    const { square } = this.state;

		this.setState(prevState => ({
			square: {
				...prevState.square,
				rotation: square.rotation + Math.floor(Math.random() * 2    )
			}
		}));
	}

	constructor(props) {
		super(props);

        const width = 80;
        const height = 80;

        this.state = {
			square: {
				width,
				height,
				position: {
					top: (props.dimension.height / 2) - (height / 2),
					left: (props.dimension.width / 2) - (width / 2)
				},
				rotation: 0
			}
		};

		this._handleKeyDown = this._handleKeyDown.bind(this);
	}

	componentWillMount() {
		document.addEventListener('keyup', this._handleKeyDown);
	}

	componentDidMount() {
		this.squareInterval = setInterval(() => this._rotateSquare(), 300);
	}

	componentWillUnmount() {
		document.removeEventListener('keyup', this._handleKeyDown);
		clearInterval(this.squareInterval);
	}

	render() {
		const title = 'Press "Space" to play';
		const { square } = this.state;

		return (
			<div class={style.resume}>
				<h1>{title}</h1>
				<Square square={square} />
			</div>
		);
	}
}
