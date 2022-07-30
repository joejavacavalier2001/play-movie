
import React, {useCallback} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';

const PickYouTubeVideo = ({access_token = "",onChosenId = () => {}, unSeenMovies = [],imgClass = ""}) => {
	const handleClick = useCallback((event) => {
		let currentElem = event.target;
		while ((!currentElem.dataset.movieindex) && (currentElem != document))
			currentElem = currentElem.parentElement;
		if (currentElem.dataset.movieindex)
			onChosenId(parseInt(currentElem.dataset.movieindex));
	},[onChosenId]);

	//const windowwidth = useMemo(() => window.innerWidth);
	return (
		<Container>
			<Row><Col xs={'auto'} md={'auto'}>
				<div className={(imgClass == "high") ? "h3" : "h6"}>Please click or tap a YouTube movie to view</div>
			</Col></Row>
			{/*<Row><Col xs={'auto'} md={'auto'}>
				<div className={(imgClass == "high") ? "h3" : "h6"}>window innerWidth is {windowwidth}</div>
			</Col></Row>*/}
			<For each="movie" index="idx" of={unSeenMovies}>
				<Row key={`movierow${idx}`}>
					<Col xs={'auto'} md={'auto'}>
						<img className={imgClass} data-movieindex={movie.movieindex} onClick={handleClick} src={movie.thumbnail} alt={movie.title} title={movie.title}/>
					</Col>
					{/*
					<Col xs={5} md={5} style={{display: "flex", alignItems: "center", backgroundColor: "lightblue"}}>
						<h5>{movie.title}</h5>
					</Col>
					*/}
				</Row>
			</For>
		</Container>
	);
};

export default PickYouTubeVideo;

