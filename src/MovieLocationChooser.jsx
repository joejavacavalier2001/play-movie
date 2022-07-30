
import React,{useState,useRef,useMemo,useCallback,useEffect} from 'react';
import {ListGroup} from 'react-bootstrap';

const MovieLocationChooser = ({locations = [], onChosenLocation = () => {}}) => {
	const [chosenLocation, setChosenLocation] = useState("");
	const queryRef = useRef(null);

	const instructSuffix = useMemo(() => {
		let returnValue = "";
		if (chosenLocation == "YouTube")
			returnValue = " with a query string";
		return returnValue;
	},[chosenLocation]);

	const changeHandler = (event) => {setChosenLocation(event.target.value);};
	const submitHandler = useCallback((event) => {
		event.preventDefault();
		onChosenLocation(chosenLocation, ((chosenLocation == "YouTube") ? event.target.elements.querystring.value : ""));
	},[chosenLocation,onChosenLocation]);
	useEffect(() => {
		if (queryRef && queryRef.current)
			queryRef.current.focus();
	});
	return (
		<form onSubmit={submitHandler}>
			<h5>Please choose a movie location</h5>
			<If condition={instructSuffix.length}>
				<h5 style={{textAlign: "center"}}>{instructSuffix}</h5>
			</If>
			<ListGroup>
				<For each="location" index="idx" of={locations}>
					<ListGroup.Item key={"listgroup" + location} active={chosenLocation == location}>
						<input type="radio" name="location" id={"radio-" + location} onChange={changeHandler} value={location}/>
						<label htmlFor={"radio-" + location}>{location}</label>
					</ListGroup.Item>
				</For>
			</ListGroup>
			<If condition={chosenLocation=="YouTube"}>
				<br />
				<p className="formLabel">Please enter a query string here:</p>
				<input ref={queryRef} type="text" id="querystring" name="querystring" size="30"/>
				<br />
			</If>
			<br />
			<If condition={chosenLocation != ""}>
				<input type="submit" className="btn btn-primary" value="Set movie location"/>
			</If>
		</form>
	);
};


export default MovieLocationChooser;

