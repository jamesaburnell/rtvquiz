import React from 'react'

export default class Event extends React.Component {
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className="event" style={{height: this.props.pxheight, top: this.props.pxstart}}>
				<p>{this.props.title}</p>
				<p>{this.props.startTime}</p>
			</div>
		)
	}
}