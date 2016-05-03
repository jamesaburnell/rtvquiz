import React from 'react'
import Event from './Event.jsx'

export default class Events extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidMount () {
		console.log(this.props);
	}

	render(){
		console.log(this.props)
		let id = 0
		return (
			<div id="eventContainer">
				{this.props.data ? this.props.data.map(event => {
					return <Event 
							key={id++} 
							title={event.title} 
							pxstart={event.pxstart} 
							pxheight={event.pxheight} 
							startTime={event.startTime}
							/>
				}) : []}
			</div>
		)
	}
}