import{
    getDatabase,
    ref,
    get,
    query,

} from "firebase/database";
const notesFetch = (
    setToDisplayPosts,
    toDisplayPosts,
    // userPosts,
    userId
) => {
    const db = getDatabase();

    const dbRef = query(ref(db, "notes/"+userId+"/"));

    get(dbRef).then((snapshot)=>{
        if(snapshot.exists()){
            console.log(snapshot.val());
            let temp=[];
            for (const key in snapshot.val()) {
                temp.push({...snapshot.val()[key],key:key});
              }
              setToDisplayPosts((temp));
              console.log(temp);
            
          
        }
    })
};
export default notesFetch;