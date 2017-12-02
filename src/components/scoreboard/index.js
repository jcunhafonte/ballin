import { Component } from 'preact';
import style from './style';

const highScoreKey = 'high_score';

export default class Scoreboard extends Component {
	_setHighScore(key, score = 0) {
		localStorage.setItem(key, score);
	}

	_getHighScore() {
		let highScore = localStorage.getItem(highScoreKey);

		if (highScore) return highScore;

		this._setHighScore(highScoreKey);
		return localStorage.getItem(highScoreKey);
	}

	constructor(props) {
		super(props);
		this.state = {
			score: props.score,
			highScore: this._getHighScore(),
			game: props.game
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.score !== this.props.score) {
			if (localStorage.getItem(highScoreKey) < nextProps.score) this._setHighScore(highScoreKey, nextProps.score);
			this.setState({ score: nextProps.score, highScore: this._getHighScore() });
		}
		if (nextProps.game !== this.props.game) this.setState({ game: nextProps.game });
	}

	render() {
		const { score, highScore, game } = this.state;

		return (
			<div class={style.scoreboard}>
				{game.playing && <h2>{score}</h2>}
				{!game.playing &&
                <div class={style.scoreboard__resume}>
                	<div>
                		<h4>Score</h4>
                		<h2>{score}</h2>
                	</div>
                	<div>
                		<h4>High score</h4>
                		<h2>{highScore}</h2>
                	</div>
                </div>
				}
			</div>
		);
	}
}