import React,{Component} from "react"
import queue from '../data/queue'
const uri = require("../../../utility/uri")
const MyContext = React.createContext();
export class Provider extends Component {
    constructor(props){
        super(props)
        this.point_plus = 3
    }
    state = {
        popupShow: false,
        playing: false,
        store: new queue(),
        data: null,
        count: 0,
        isNext: false,
        flag: false,
        user_input: "",
        message: "",
        isLoading: true,
        user_info: null,
        flat_data: null
    }
    setIsloading = (data)=>{
        this.setState({ isLoading : data})
    }
    setShowPopup = (data)=>{
        this.setState({ popupShow : data})
    }
    setPlaying =(data)=>{
        this.setState({playing: data});
    }
    setCount =(data)=>{
        this.setState({count: data});   
    }
    setNext =(data)=>{
        this.setState({isNext: data});   
    }
    setData = (data)=>{
        this.setState({data:data})
    }
    setTypeOfGame = (data)=>{
        this.setState({typeofgame: data})
    }
    updateInput = (data)=>{
        this.setState({user_input: data})
    }
    updateData = (list)=>{
        console.log("MyContext",list)
        this.setCount(list.length)
        this.state.store.clear();
        for(let i=0;i< list.length;i++){
            this.state.store.enqueue(list[i])
        }
    }
    updateUserInfo = (data)=>{
        this.setState({
            user_info: data
        })
    }
    startPlaying = ()=>{
        this.setData(this.state.store.peek());
        this.setPlaying(true);
    }
    checkAnswer = (data)=>{
        this.setNext(true);
        let item = this.state.store.dequeue();
        const book_word = data.trim().toLowerCase();
        const user_word = this.state.user_input.toString().trim().toLowerCase();
        if(user_word.localeCompare(book_word) == 0){
            console.log("Chính xác")
            let audio = new Audio()
            audio.src = "/media/K%C4%90_true.oga"
            audio.load();
            audio.play();
            const data = this.checkPointUser(item,true)
            console.log(data)
            uri.request("/english/up_point_user",data,"post")
            this.setState({
                flat_data: data
            })
        }else{
            console.log("Không chính xác",item)
            let audio = new Audio()
            audio.src = "/media/KĐ_false.oga"
            audio.load();
            audio.play();
            this.state.store.enqueue(item)
            const data = this.checkPointUser(item,false)
            console.log(data)
            uri.request("/english/up_point_user",data,"post")
            this.setState({
                flat_data: data
            })
        }
    }
    nextPlaying = ()=>{
        this.updateInput("");
        this.setNext(false);
        this.setCount(this.state.store.count());
        this.setData(this.state.store.peek())
    }
    getDataDetail = (data,key)=>{
        return data.datadetails[0][key];
    }
    checkPointUser = (data,answer)=>{
        let {loop,point,coefficient,toward,target, _id} = data

        
        /**
         * Point
         */
        if(answer){
            point += coefficient; 
        }else{
            point -= coefficient; 
            if(point < 0){
                point = 0;
            }
        }
        /**
         * coefficient and toward
         */
        if(answer && toward == 1){
            coefficient += coefficient;
        }else if(answer && toward == -1){
            coefficient = 1;
            toward = 1;
        }else if(!answer && toward == 1){
            coefficient = 1;
            toward = -1;
        }else if(!answer && toward == -1){
            coefficient += coefficient; 
        }else{
            console.log("case other coefficient and toward")
        }
        /**
         * update loop and target
         * loop += loop
         * target = point + 3
         */
        if(loop >= 1){
            if(point >= target){
                loop += loop;
                target = point + this.point_plus;
                //start repeat coefficient
                coefficient = 1; 
            }
        }
        return {
            _id, loop ,point, coefficient, toward, target
        }

    }
    addTypeOfGame = (data)=>{
        let listItem = typeof data == "object" ? data : [];
        for(let i=0;i<listItem.length;i++){
            listItem[i].type = Math.floor((Math.random() * 2) + 1);
        }
        return listItem;
    }
    getDataGame = (fn)=>{
        uri.request("english/store",{},"POST")
        .then(res=>{
            const data = this.shuffle((this.addTypeOfGame(res.data.data.data)))
            this.updateData(data);
            let dt = {
                repeatStudy: res.data.data.repeatStudy,
                todayStudy: res.data.data.todayStudy,
                user_target: res.data.data.user_target
            }
            this.updateUserInfo(dt);
            fn();
        })
    }
    shuffle(array) {
        let m = array.length, t, i;
      
        // While there remain elements to shuffle…
        while (m) {
      
          // Pick a remaining element…
          i = Math.floor(Math.random() * m--);
      
          // And swap it with the current element.
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
      
        return array;
    }
    render(){
        return (
            <MyContext.Provider value={{
                state: this.state,
                action: {
                    setShowPopup: this.setShowPopup,
                    setPlaying: this.setPlaying,
                    setCount: this.setCount,
                    updateData: this.updateData,
                    startPlaying: this.startPlaying,
                    checkAnswer: this.checkAnswer,
                    nextPlaying: this.nextPlaying,
                    updateInput: this.updateInput,
                    setIsloading: this.setIsloading,
                    updateUserInfo: this.updateUserInfo,
                    getDataDetail: this.getDataDetail,
                    getDataGame: this.getDataGame
                }
            }}>
                {this.props.children}
            </MyContext.Provider>
        );
    }
}

export const Consumer = MyContext.Consumer;