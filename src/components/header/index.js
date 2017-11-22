import { h, Component } from 'preact';
import style from './style';

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<h1>Are you on the fly? Yes! :)</h1>
			</header>
		);
	}
}
