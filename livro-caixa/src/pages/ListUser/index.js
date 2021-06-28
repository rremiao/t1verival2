import React, { Component } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { Container } from "./styles";
import Stores from '../../models'

const { UserStore } = Stores

class ListUser extends Component {
  state = {
    user: "",
    init: "",
    index: 0,
    errorMessage: "",
  };

  componentDidMount = () => {
    if(UserStore.user === ""){
      UserStore.setSelectedUser("Raquel")
    }
    const currentIndex = this.getIndex(UserStore.user)
    this.setState({
      user: UserStore.user, 
      init: this.translateInitials(UserStore.user),
      index: currentIndex})
  }

  translateInitials = (user) => {
    let allUsers = JSON.parse(JSON.stringify(UserStore.userList))
    const foundUser = allUsers.find((oneUser) => oneUser.user === user)
    if(!foundUser) return ''
    return foundUser.initials
  }

  getIndex = (user) => {
    let allUsers = JSON.parse(JSON.stringify(UserStore.userList))
    const foundUser = allUsers.find((oneUser) => oneUser.user === user)
    if(!foundUser) return ''
    return foundUser.index
  }

  validateColor = (index) => {
    const {index: stateIndex} = this.state
    if (index === stateIndex) return 'yellow'
    return 'white'
  }

  handleUserChange = (user, index) => {
    UserStore.setSelectedUser(user)
    this.setState({user: user, init: this.translateInitials(user), index})
  }

  handleUserDeletion = () => {
    const { user } = this.state
    try{
    UserStore.deleteUser(user)
    this.setState({user: UserStore.user, init: this.translateInitials(UserStore.user), index: 0})
    }catch(error){
      this.setState({errorMessage: error.message})
    }
  }

  goHome = () => {
    this.props.history.push({ pathname:"/" })
  }

  goCreate = () => {
    this.props.history.push({ pathname:"/createUser" })
  }


  renderUsers = () => {
    const {userList} = UserStore

    const objeto = JSON.parse(JSON.stringify(userList))
    
      const allUsers = [...Array(objeto.length)].map((_,index) => {
      const value = objeto[index]

      return (
        <Button style={{backgroundColor: this.validateColor(index)}} onClick={() => this.handleUserChange(value.user, index)}>{value.user} {this.translateInitials(value.user)}</Button>
      )
    })
    return allUsers
  }

  renderError = () => {
    const { errorMessage } = this.state
    return (
      <Typography style={{color: 'red', fontWeight: 'bold'}}>{errorMessage} </Typography>
    )
  }

  render() {
    const { user, init, errorMessage } = this.state
    return (
      <Container>
        <Grid style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: 20 }}>
          <Grid item md={3} style={{ display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <Typography>O seu morador atual é {user} {init}</Typography>
          {this.renderUsers()}
          {errorMessage !== "" && (this.renderError())}
          <Button variant="outlined" onClick={() => this.goCreate()} style={{margin: 10}}>
              Clique aqui para registrar um novo morador!
          </Button>
          <Button style={{margin: 10}} variant="outlined" onClick={() => this.handleUserDeletion()}> Clique aqui para excluir um morador </Button>
          <Typography style={{margin: 10}}> Para voltar para Home Page <Button variant="outlined" onClick={() => this.goHome()}>clique aqui</Button>
          </Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default ListUser;
