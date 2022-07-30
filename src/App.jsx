import './App.scss';
import React,{useState} from 'react';
import MovieLocationChooser from './MovieLocationChooser';
import CenterChildrenOnPage from "./CenterChildrenOnPage";
import LocalMovie from "./LocalMovie";
import GoogleYouTubeMovie from "./GoogleYouTubeMovie";

const App = () => {

	//const mode = ((DEBUGGING_NOW) ? "debugging" : "production");
	const [chosenLoc, setChosenLoc] = useState("");
	const [queryString, setQueryString] = useState("");
	const resetChosenLoc = () => {setChosenLoc("");};

	const handleChosenLoc = (movieloc,newQueryString = "") => {
		// Automatic batching in React 18.x prevents this function from botching the rendering
		setChosenLoc(movieloc);
		setQueryString(newQueryString);
	};

	return (
		<div className="center_children">
			<Choose>
				<When condition={ chosenLoc == "Local" }>
					<LocalMovie goBack={resetChosenLoc}/>
				</When>
				<When condition={ chosenLoc == "YouTube" }>
					<GoogleYouTubeMovie goBack={resetChosenLoc} queryStringFromForm={queryString}/>
				</When>
				<Otherwise>
					<MovieLocationChooser locations={['Local','YouTube']} onChosenLocation={handleChosenLoc}/>
				</Otherwise>
			</Choose>
		</div>
	);
};

export default App;
