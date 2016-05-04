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
				console.log('events', events)
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
			event.overlap = false
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
		let next,leftOffset, leftMod, temp, h, i, j, k, l, outputData, 
			length = data.length
		for(i = 0; i < length; i++){
			k = i+1
			console.log(data[i])

			if(data[i].left === 0) {
				data[i].overlap = false
				leftMod = 1
			}

			while(k < length && data[i].pxend > data[k].pxstart){
					data[i].widthMod = data[i].widthMod+1
					data[k].widthMod = data[k].widthMod+1
					data[k].overlap = true
				if(!data[i].overlap) leftMod++
				k++
			}
			for(h = i; h < k; h++){
				data[h].width = (630/data[h].widthMod)
			}
			// Set the left positions of events
			leftOffset = 630/(leftMod)
			while(k > i){
				if (data[k+1] && data[k+1].pxstart < data[i].pxend){
					console.log(data[k].title, data[k].left)
					data[k].left = (data[k-1].left + leftOffset)
				}
				k--;
			}
		}
		console.log('end',data)
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
