import React from 'react'
import Times from './Times.jsx'
import Events from './Events.jsx'

export default class Landing extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			data: null
		};
		this.getAndUpdateEvents = this.getAndUpdateEvents.bind(this)
	}

	componentDidMount() {
		this.getAndUpdateEvents();
	}

	getAndUpdateEvents(){
		fetch('./../../events.json')
			.then(response => response.json())
			.then(response => {
				let events = this.addPixelValues(response).sort((a,b) => a.pxstart - b.pxstart)
				events = this.findConflicts(events)
				this.setState({
					data: events
				})
			});
	}

	addPixelValues(data){
		return data.events.map((event, idx) => {
			event.pxstart = this.convertTimeToPixel(event.startTime)
			event.pxend = this.convertTimeToPixel(event.endTime)
			event.pxheight = (event.pxend - event.pxstart)
			event.widthMod = 1
			event.id = idx
			event.overlappers = []
			event.left = 0
			return event
		})
	}

	convertTimeToPixel (string) {
		let toAdd
		return (string.split(':')
					.map(ele => parseInt(ele, 10))
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

	findConflicts(data){
		let curr, next, k, count, diff
		for(let i = 0; i < data.length; i++){
			count = 1
			k = i+1
			while(k < data.length && data[i].pxend > data[k].pxstart){
				data[i].widthMod = data[i].widthMod+1
				data[k].widthMod = data[k].widthMod+1
				count++
				k++
			}
			k--
			while(k > i){
				// data[k].left = (630 - (630/(k+1)));
				k--
				count--
			}


		}
		for(let h = 0; h < data.length; h++){
				data[h].width = (630/data[k].widthMod)
		}

		// let overlap, current, i, isOverlap, length, curr, widthOffset
		// data.forEach((event, idx) => {
		// 	for(i = idx+1; i < data.length && event.pxend > data[i].pxstart; i++) {
		// 		event.overlappers.push(i)
		// 		event.widthMod = event.widthMod+1
		// 		data[i].widthMod = data[i].widthMod+1
		// 	}
		// 	event.width = (630/event.widthMod)
		// 	length = event.overlappers.length
		// 	widthOffset = 0

		// 	// event.overlappers.forEach((idx) => {
		// 	// 	widthOffset+=(630/length)
		// 	// 	data[idx].left = data[idx].left+widthOffset
		// 	// })
		// })
		// i = 0
		// while(data[i]){

		// }

		return data
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
