import { ADD_LOGIN_DATA, GET_LOGIN_DATA, GET_MOVIE_DATA } from "./actionType";

const intialState = {
  loginData:  JSON.parse(localStorage.getItem("userData")) || {},
  movieData: [
    { id: 1, name:'one', description:'Series of moving images shown on a screen, usually with sound, that make up a story'
    , videoSrc: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', imageSrc: 'https://cdn.pixabay.com/photo/2014/12/09/20/27/child-562297_960_720.jpg'}, 
    { id: 2, name:'two', description:'Series of moving images shown on a screen, usually with sound, that make up a story', videoSrc: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", imageSrc: 'https://cdn.pixabay.com/photo/2014/02/13/07/28/security-265130_960_720.jpg'},
    {id: 3,  name:'three', description:'Series of moving images shown on a screen, usually with sound, that make up a story', videoSrc: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', imageSrc: 'https://cdn.pixabay.com/photo/2014/12/09/20/27/child-562297_960_720.jpg'}, 
    { id: 4, name:'four', description:'Series of moving images shown on a screen, usually with sound, that make up a story', videoSrc: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", imageSrc: 'https://cdn.pixabay.com/photo/2020/04/20/18/10/cinema-5069314_960_720.jpg'},
    {id: 5, name:'five', description:'Series of moving images shown on a screen, usually with sound, that make up a story', videoSrc: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", imageSrc: 'https://cdn.pixabay.com/photo/2014/02/13/07/28/security-265130_960_720.jpg'}
  ]
};

export default function MovieReducers(state = intialState, action) {
  switch (action.type) {

    case ADD_LOGIN_DATA:
      return { ...state, loginData: action.payload };

    case GET_MOVIE_DATA:
      return { ...state, movieData: action.payload };

    default:
      return state;
  }
}