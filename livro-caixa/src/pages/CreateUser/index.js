import React, { Component } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Container } from "./styles";
import Stores from "../../models"

const { UserStore } = Stores

class CreateUser extends Component {
  state = {
      user: "",
      init: "",
      errorInit: false,
      errorUser: false,
      errorMessage: "",
  };

  handleConfirm = () => {
    const {user, init} = this.state
    try{
      this.validateFields()
      UserStore.setSelectedUser(user)
      UserStore.addUser(user, init)
      this.props.history.push({pathname:'/'})
    }
    catch(error){
      this.setState({errorMessage: error.message})
    }
    
    
  }

  validateFields = () => {
    const {user, init} = this.state 
    let userFlag = false
    let initFlag = false

    if(user === ""){
      this.setState({errorUser: true})
      userFlag = true
    }
    if(init === ""){
      this.setState({errorInit: true})
      initFlag = true
    }
    if(!initFlag && !userFlag) return {}
    if(initFlag && userFlag) throw new Error("Os campos devem ser preenchidos")
    if(initFlag) throw new Error("Iniciais devem ser preenchidas")
    if(userFlag) throw new Error("Usuário deve ser preenchido")
  }

  renderError = () => {
    const {errorMessage} = this.state
    return <Typography 
    style={{color:'red', fontWeight: 'bold',  margin:10}}>
      {errorMessage}
    </Typography>
  }

  handleHomePage = () => {
    this.props.history.push({pathname:'/'})
  }

  handleBackToList = () => {
    this.props.history.push({pathname:'/listUser'})
  }

  render() {
    const { errorInit, errorUser } = this.state
    return (
      <Container>
        <Grid style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: 20 }}>
          <Grid item md={3} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography style={{marginBottom:20}}> Digite as informações requeridas</Typography>
             <TextField error={errorUser} variant="outlined" label= "Nome " onChange={({target: { value }}) => this.setState({user:value, errorUser: false})} style={{marginBottom:20}}/>
             <TextField error={errorInit} variant="outlined" label= "Iniciais " onChange={({target: { value }}) => this.setState({init: value, errorInit: false})} />
             {(errorInit || errorUser) && (this.renderError())}
             <Button onClick={() => this.handleConfirm()}> Confirmar dados!</Button>
             <Button onClick={() => this.handleBackToList()}>Voltar para a Lista de Usuários</Button>
             <Button onClick={() => this.handleHomePage()}>Voltar para a Home Page</Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
export default CreateUser;
