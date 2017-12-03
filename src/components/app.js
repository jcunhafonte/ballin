import { Component } from 'preact';
import Scene from './scene/index';
import Footer from './footer/index';

export default class App extends Component {
	render() {
		return (
			<div id="app">
				<Scene />
				<Footer />
			</div>
		);
	}
}
