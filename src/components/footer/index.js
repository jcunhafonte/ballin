import { Component } from 'preact';
import style from './style';

export default class Footer extends Component {
	render() {
		const credits = 'built with <3 by';

		return (
			<footer class={style.footer}>
				<p>{credits} <a href={'https://jcunhafonte.com'}>jcunhafonte</a></p>
			</footer>
		);
	}
}
