
import React,{useState,useCallback,useMemo,useEffect} from 'react';
import ReactPlayer from 'react-player';
import PickYouTubeVideo from './PickYouTubeVideo';
import CenterChildrenOnPage from './CenterChildrenOnPage';
import axios from 'axios';
import he from 'he';

const GoogleYouTubeMovie = ({queryStringFromForm = "", goBack = () => {}}) => {
	const [chosenMovieId, setChosenMovieId] = useState("");
	const [movieList, setMovieList] = useState([]);
	const [errorMsg, setErrorMsg] = useState("");

	const handleEvent = useCallback((event) => {
		goBack();
	},[goBack]);

	const clearMovieId = () => setChosenMovieId("");
	const handleChosenMovieId = (movieindex) => {
		setChosenMovieId(movieList[movieindex].id);
		setMovieList((oldlist) => {
			oldlist[movieindex].hasNotBeenSeen = false;
			return [...oldlist];
		});
	};
	const queryString = useMemo(() => {
		if (queryStringFromForm)
			return queryStringFromForm;

		let fromStorage = window.localStorage.getItem("YouTubeQueryString");
		return ((fromStorage === null) ? "the body is round" : fromStorage);
	},[queryStringFromForm]);

	const imgClass = useMemo(() => {return ((window.innerWidth >= 576) ? "high" : "");});


	useEffect(() => {
		window.addEventListener("popstate", handleEvent);
		history.pushState({}, '');
		if (!movieList.length){
			axios("https://www.googleapis.com/youtube/v3/search",{
				params: {
					key: "<make your own app key from the Google Developer Console>",
					part: "id,snippet",
					q: queryString, 
					maxResults: 6
				},
				headers: {
					'Accept': 'application/json'
				},
			}).then((response) => {
				if ("error" in response)
					throw new Error(response.error);

				setMovieList(response.data.items.filter((item) => {return (("videoId" in item.id) && (item.id.videoId));}).map((item,i) => {
					return  {
						id: item.id.videoId, 
						thumbnail: ((window.innerWidth >= 576) ? (item.snippet.thumbnails.high.url) : (item.snippet.thumbnails.medium.url)), 
						title: he.decode(item.snippet.title),
						hasNotBeenSeen: true,
						movieindex: i
					};
				}));

			}).catch((error) => {
				if ("message" in error)
					setErrorMsg(error.message);
				else if ((typeof error) == "string")
					setErrorMsg(error);
			});
		} else if (movieList.every((movie) => !movie.hasNotBeenSeen))
			setMovieList((oldList) => {
				oldList.forEach((movie) => {movie.hasNotBeenSeen = true;});
				return [...oldList];
			});
		return () => window.removeEventListener("popstate", handleEvent);
		
	});

	return (
		<Choose>
			<When condition={errorMsg != ""}>
				<h3>{errorMsg}</h3>
			</When>
			<When condition={chosenMovieId != ""}>
				<ReactPlayer playing={true} controls={true} onEnded={clearMovieId} url={`https://www.youtube.com/watch?v=${chosenMovieId}`}/>
			</When>
			<Otherwise>
				<Choose>
					<When condition={movieList.some((movie) => movie.hasNotBeenSeen)}>
						<PickYouTubeVideo onChosenId={handleChosenMovieId} unSeenMovies={movieList.filter((movie) => movie.hasNotBeenSeen)} imgClass={imgClass}/>
					</When>
					<Otherwise>
						<CenterChildrenOnPage border={false}><h3>Loading movie list...</h3></CenterChildrenOnPage>
					</Otherwise>
				</Choose>
			</Otherwise>
		</Choose>
	);
};


export default GoogleYouTubeMovie;

