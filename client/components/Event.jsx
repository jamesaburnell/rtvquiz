import React from 'react'

export default class Event extends React.Component {
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div 
			className="event" 
			style={
				{
					height: this.props.pxheight, 
					top: this.props.pxstart, 
					width: this.props.width+'px', 
					left: this.props.left}
				}>

				<p>{this.props.title} ({this.props.id})</p>
				<p>{this.props.startTime}</p>

			</div>
		)
	}
}