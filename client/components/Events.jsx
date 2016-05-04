import React from 'react'
import Event from './Event.jsx'

export default class Events extends React.Component {

	render(){
		let id = 0
		return (
			<div id="eventContainer">
				{this.props.data ? this.props.data.map(event => {
					let width = (630/event.width)
					return <Event 
							key={id++} 
							title={event.title} 
							pxstart={event.pxstart} 
							pxheight={event.pxheight} 
							startTime={event.startTime}
							width={event.width}
							left={event.left}
							id={event.id}
							/>
				}) : []}
			</div>
		)
	}
}