import { Component } from 'preact';
import style from './style';
import { Colors } from '../../constants/colors';

export default class Circle extends Component {
	_getFill() {
		const { face } = this.state;

		if (face === 0) return Colors.red;
		if (face === 1) return Colors.green;
		if (face === 2) return Colors.blue;
		if (face === 3) return Colors.orange;
	}

	constructor(props) {
		super(props);
		this.state = props.circle;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.circle !== this.props.circle) this.setState(nextProps.circle);
	}

	render() {
		const { width, height, position } = this.state;
		const fill = this._getFill();

		return (
			<div style={position} class={style.circle}>
				<svg viewBox={`0 0 ${width * 2} ${height * 2}`}>
					<circle cx={width} cy={height} r={width} fill={fill} />
				</svg>
			</div>
		);
	}
}
