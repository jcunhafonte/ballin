import { Component } from 'preact';
import Square from '../square/index';
import Circle from '../circle/index';
import style from './style';

export default class Game extends Component {
	_getRandomValue() {
		return Math.floor(Math.random() * 4);
	}

	_getCircleFace() {
		return this._getRandomValue();
	}

	_getCircleDirection() {
		return this._getRandomValue();
	}

	_getCirclePosition(direction, width, height) {
		const { dimension } = this.props;
		const safeArea = 4;
		let top, left;

		switch (direction) {
			case 0:
				top = (-height - safeArea);
				left = (dimension.width / 2) - (width / 2);
				break;
			case 1:
				top = (dimension.height / 2) - (height / 2);
				left = (dimension.width + safeArea);
				break;
			case 2:
				top = (dimension.height + safeArea);
				left = (dimension.width / 2) - (width / 2);
				break;
			case 3:
				top = (dimension.height / 2) - (height / 2);
				left = (-width - safeArea);
				break;
		}

		return {
			top,
			left
		};
	}

	_getCircle() {
		const direction = this._getCircleDirection();
		const width = 20;
		const height = 20;

		return {
			face: this._getCircleFace(),
			direction,
			width,
			height,
			position: this._getCirclePosition(direction, width, height)
		};
	}

	_getSquare() {
		const { dimension } = this.props;

		const width = 80;
		const height = 80;

		return {
			rotation: 0,
			direction: 0,
			width,
			height,
			position: {
				top: (dimension.height / 2) - (height / 2),
				left: (dimension.width / 2) - (width / 2)
			}
		};
	}

	_moveCircle() {
		const { direction, position } = this.state.circle;
		let top, left;

		switch (direction) {
			case 0:
				top = position.top + 2;
				left = position.left;
				break;
			case 1:
				top = position.top;
				left = position.left - 2;
				break;
			case 2:
				top = position.top - 2;
				left = position.left;
				break;
			case 3:
				top = position.top;
				left = position.left + 2;
				break;
		}

		this.setState(prevState => ({
			circle: {
				...prevState.circle,
				position: {
					top,
					left
				}
			}
		}), () => this._handleCollision());
	}

	_handleCollision() {
		const { circle, square } = this.state;
		const safeArea = 2;

		if (circle.direction === 0 && (circle.position.top + (circle.height - safeArea)) > square.position.top)
			circle.face === square.direction ? this._match() : this._lost();

		if (circle.direction === 1 && (circle.position.left + safeArea) < (square.position.left + square.width))
			circle.face === (square.direction === 3 ? 0 : (square.direction + 1)) ? this._match() : this._lost();

		if (circle.direction === 2 && (circle.position.top + safeArea) < (square.position.top + square.height))
			circle.face === (square.direction === 3 ? 1 : ((square.direction + 2) === 4 ? 0 : (square.direction + 2))) ? this._match() : this._lost();

		if (circle.direction === 3 && (circle.position.left + (circle.width - safeArea)) > (square.position.left))
			circle.face === (square.direction === 3 ? 2 : ((square.direction + 3) === 4 ? 0 : (square.direction + 3) === 5 ? 1 : (square.direction + 3))) ? this._match() : this._lost();
	}

	_handleKeyDown(event) {
		if (this.state.game.playing && event.keyCode === 32) this._rotateSquare();
	}

	_rotateSquare() {
		const { square } = this.state;
		const direction = square.direction === 0 ? 3 : square.direction - 1;

		this.setState(prevState => ({
			square: {
				...prevState.square,
				rotation: square.rotation + 1,
				direction
			}
		}), () => this.props.onRotate(this.state.square.rotation));
	}

	_lost() {
		this.props.onCollision(false);
		this.setState(prevState => ({
			game: {
				...prevState.game,
				playing: false
			}
		}));

		clearInterval(this.circleInterval);
	}

	_match() {
	    this.props.onCollision(true);

		this.setState({
			circle: this._getCircle()
		}, () => {
			this.setState(prevState => ({
				game: {
					...prevState.game,
					speed: Math.max(this.state.game.speed - .5, 6)
				}
			}), () => {
				clearInterval(this.circleInterval);
				this.circleInterval = setInterval(() => this._moveCircle(), this.state.game.speed);
			});
		});
	}

	constructor(props) {
		super(props);
		this.state = {
			game: props.game,
			circle: this._getCircle(),
			square: this._getSquare()
		};

		this._handleKeyDown = this._handleKeyDown.bind(this);
	}

	componentWillMount() {
		document.addEventListener('keyup', this._handleKeyDown);
	}

	componentDidMount() {
	    this.circleInterval = setInterval(() => this._moveCircle(), this.state.game.speed);
	}

	componentWillUnmount() {
		document.removeEventListener('keyup', this._handleKeyDown);
		clearInterval(this.circleInterval);
	}

	render() {
		const { circle, square } = this.state;

		return (
			<div class={style.game} >
				<Circle circle={circle} />
				<Square square={square} />
			</div>
		);
	}
}
