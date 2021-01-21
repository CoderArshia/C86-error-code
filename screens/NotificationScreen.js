import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import{Card,Header,Icon, ListItem} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config.js';

export default class NotificationScreen extends Component{
    constructor(props){
        super(props);
         this.state={
             userId:firebase.auth().currentUser.email,
             allNotifications:[]
         }
this.notificationRef=null
    }

    getNotifications =()=>{
        this.requestRef = db.collection("all_notifications").where("targeted_user_id" ,'==', this.state.userId )
        .where("notification_status","==","Unread")
        .onSnapshot((snapshot)=>{
          var allNotifications =[]
         snapshot.docs.map((document) => {
             var notification= document.data()
             notification["doc_id"]=doc.id
             allNotifications.push(notification)
         })
         this.setState({
            allNotifications : allNotifications,
          });
        })
      }

      componentDidMount(){
          this.notifications()
      }
      componentWillUnmount(){
          this.notificationRef()
      }

    keyExtractor=(item,index)=>index.toString()
    renderItem=({item,index})=>{
        return(
            <ListItem key={index}
            leftElement={<Icon name="book" type="font-awesome" color="#696969"/>}
            title={item.book_name}
            titleStyle={{color:'black',fontWeight:"bold"}}
            subtitle={item.message}
            bottomDivider
            ></ListItem>
        )
    }

    render(){
        return(
<View style={styles.container}>

    <View style={{flex:0.1}}>
        <MyHeader title={"Notifications"} navigation={this.props.navigation}></MyHeader>
    </View>
    
</View>
        )
    }
}

