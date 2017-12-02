import { Component } from 'preact';
import Scene from './scene/index';

export default class App extends Component {
	render() {
		return (
			<div id="app">
				<Scene />
			</div>
		);
	}
}
