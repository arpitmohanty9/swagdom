import React from "react";

const QuoteDisp = props => (
	<div>
	<b>Quote(s):</b> 
	 { 	
	 	 
	 	props.quote && <p> <span > "{ props.quote} " </span>
	 	</p> 
	 }
	 { 
	 	props.error && <p >{ props.error } </p>  
	 }
	</div>
);

export default QuoteDisp;