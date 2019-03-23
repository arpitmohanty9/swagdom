import React from "react";

const QuoteDisp = props => (
	<div>
	<b>Quote(s):</b> 
	<form>
	{ 	
	 	 
	 	props.quote && <p> <span > "{ props.quote} " </span>
	 	</p> 
	 }
	 { 
	 	props.error && <p >{ props.error } </p>  
	 }
	</form>
	 
	</div>
);

export default QuoteDisp;