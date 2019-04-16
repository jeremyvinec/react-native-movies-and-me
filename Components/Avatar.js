import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import setAvatar from '../Store/Reducers/avatarReducer';

class Avatar extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            avatar : require('../Images/ic_tag_faces.png')
        }
    }

    _avatarClicked() {
        ImagePicker.showImagePicker({}, (response) => {
          if (response.didCancel) {
            console.log('L\'utilisateur a annulé')
          }
          else if (response.error) {
            console.log('Erreur : ', response.error)
          }
          else {
            console.log('Photo : ', response.uri )
            let requireSource = { uri: response.uri }
            const action = { type: 'SET_AVATAR', value: requireSource}
            this.props.dispatch(action)
          }
        })
    }

    render(){
        return(
           <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={this._avatarClicked}>
               <Image style={styles.avatar} source={this.state.avatar}/>
           </TouchableOpacity> 
        )
    }
}

const mapStateToProps = state => {
  return{
    avatar: state.setAvatar.avatar
  }
}

const styles = StyleSheet.create ({
    TouchableOpacity: {
        margin: 5,
        width: 100, // Pensez bien à définir une largeur ici, sinon toute la largeur de l'écran sera cliquable
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
      },
      avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#9B9B9B',
        borderWidth: 2
      }
})

export default connect(mapStateToProps)(Avatar)