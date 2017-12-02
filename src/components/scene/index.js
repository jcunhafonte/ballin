import { Component } from 'preact';
import style from './style';
import Game from '../game/index';
import Scoreboard from '../scoreboard/index';
import Resume from '../resume/index';
import Square from '../square/index';

export default class Scene extends Component {
	_getGame(playing) {
		return {
			playing,
			speed: 20
		};
	}

	_handleOnCollision(match) {
		if (!match) setTimeout(() => this.setState({ game: this._getGame(false), rotation: 0 }), 500);
		else this.setState({ score: this.state.score + 1 });
	}

	_handleOnFinish() {
		this.setState({ game: this._getGame(true), score: 0, resume: false });
	}

	_handleOnRotate(rotation) {
		this.setState({ rotation });
	}

	_setMusic() {
	    const music = new Audio();
	    music.src = './assets/music.mp3';
	    music.play();
	}

	constructor(props) {
		super(props);
		this.state = {
			width: 480,
			height: 480,
			score: 0,
			game: this._getGame(false),
			resume: true,
			rotation: 0
		};

		this._handleOnCollision = this._handleOnCollision.bind(this);
		this._handleOnFinish = this._handleOnFinish.bind(this);
		this._handleOnRotate = this._handleOnRotate.bind(this);
	}

	componentDidMount() {
	    this._setMusic();
	}

	render() {
		const { width, height, game, score, resume, rotation } = this.state;

		return (
			<div>
				<div class={style.scene__background}>
					<Square square={{ width: '100%', height: '100%', position: {}, rotation }} />
				</div>
				<div style={{ width, height }} class={style.scene__stage}>
					{(resume || !game.playing) && <Resume resume={resume} dimension={{ width, height }} game={game} onFinish={this._handleOnFinish} />}
					{!resume && <Scoreboard score={score} game={game} />}
					{game.playing && <Game dimension={{ width, height }} game={game} onCollision={this._handleOnCollision} onRotate={this._handleOnRotate} />}
				</div>
			</div>
		);
	}
}