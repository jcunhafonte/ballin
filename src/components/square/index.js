import { Component } from 'preact';
import style from './style';
import { Colors } from '../../constants/colors';

export default class Square extends Component {
	constructor(props) {
		super(props);
		this.state = props.square;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.square !== this.props.square) this.setState(nextProps.square);
	}

	render() {
		const { rotation, width, height, position } = this.state;
		const degrees = 90;

		return (
			<div style={{ width, height, top: position.top, left: position.left, transform: `rotate(${rotation * degrees}deg)` }}
				class={style.square}
			>
				<svg viewBox="0 0 100 100">
					<polygon fill={Colors.red} points="0,0 50,50 100,0" />
					<polygon fill={Colors.green} points="100,0 50,50 100,100" />
					<polygon fill={Colors.blue} points="0,100 50,50 100,100" />
					<polygon fill={Colors.orange} points="0,0 50,50 0,100" />
				</svg>
			</div>
		);
	}
}
