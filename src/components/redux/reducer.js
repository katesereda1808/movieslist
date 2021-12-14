const initialState={
    searchLine: [],
    favMovies: [],
    idList:'',
}
let reducer=(state=initialState,action)=>{
   switch(action.type){
       case 'SEARCH':
           return {
               ...state,
               searchLine: action.payload.searchLine
           }
       case 'ADD_TO_FAVS':
           const favAction=action.payload;
           const arr=[...state.favMovies];
           let fav=arr.find(item=>item.id===action.payload.id);

           if(fav){
               return state;
           }else{
               arr.push(favAction);
           }
           return {
               ...state,
               favMovies: arr,
           }
       case 'DELETE_FROM_FAVS':
           const favs=[...state.favMovies];
           let index=favs.findIndex(item=>item.id===action.payload.id);
           favs.splice(index, 1);

           return{
               ...state,
               favMovies: favs,
           }
       case 'GET_LIST_ID':
           return {
               ...state,
               idList: action.payload.listId
           }
       default:
           return state;
   }
}
export default reducer;