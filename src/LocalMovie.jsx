
import React,{useState,useCallback,useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

const LocalMovie = (props) => {
	const [chosenMovie, setChosenMovie] = useState("");
	const [type, setType] = useState("");

	const handleChoose = useCallback((event) => {
		let URL = window.URL || window.webkitURL;
		setChosenMovie(URL.createObjectURL(event.target.files[0]));
		setType(event.target.files[0].type);
	},[setChosenMovie,setType]);

	const handleEvent = useCallback((event) => {
		if (("goBack" in props) && ((typeof props.goBack) == "function"))
			props.goBack();
		else
			history.pushState({}, '');
	},[props]);

	useEffect(() => {
		window.addEventListener("popstate", handleEvent);
		history.pushState({}, '');
		return () => window.removeEventListener("popstate", handleEvent);
	});

	return (
		<>
		{((chosenMovie) ? 
		(<video controls src={chosenMovie} type={type}/>) : 
		(<>
			<Container>
				<Row>
					<Col><label htmlFor="choselocal">Choose a local movie file:</label></Col>
				</Row>
				<Row>
					<Col><input id="choselocal" type="file" accept="video/*,.mp4,.mov,.webm" onChange={handleChoose}/></Col>
				</Row>
			</Container>
		</>)
		)}
		</>
	);
};


export default LocalMovie;

