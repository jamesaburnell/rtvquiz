import React from 'react'
import Times from './Times.jsx'
import Events from './Events.jsx'

export default class Landing extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			data: null
		};
		this.handleClick = this.handleClick.bind(this)
		this.getAndUpdateEvents = this.getAndUpdateEvents.bind(this)
	}

	componentDidMount() {
		this.getAndUpdateEvents();
	}

	getAndUpdateEvents(){
		fetch('./../../events.json')
			.then(response => response.json())
			.then(response => {
				let events = this.addPixelValues(response)
				this.setState({
					data: events
				})
			});
	}

	addPixelValues(data){
		return data.events.map(event => {
			event.pxstart = this.convertTimeToPixel(event.startTime)
			event.pxend = this.convertTimeToPixel(event.endTime)
			event.pxheight = (event.pxend - event.pxstart)
			return event
		})
	}

	convertTimeToPixel (string) {
		let pieces = string.split(':'), toAdd
		return (pieces.map(ele => parseInt(ele, 10))
					.reduce((all, num, i) => {
						toAdd = 0
						if(i === 0){
							while(num > 0){
								toAdd += 60
								num--
							}
						}
						if(i === 1){
							while(num > 0){
								toAdd += 1;
								num--
							}
						} 
						if (i < 2){
							return all += toAdd
						}
						return all
					}, 0) - 540)
	}

	handleClick(){
		this.setState({
			hw: this.state.hw === 'Hello Wurld!' ? 'Bonjour' : 'Hello Wurld!'
		})
	}

	render(){
		console.log(this.state)
		return (
			<div id="fullContainer">
				<div id="centeredContainer">
					<Times />
					<Events data={this.state.data} />
				</div>
			</div>

		)
	}
}
