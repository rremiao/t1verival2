import React, { Component } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Container } from "./styles";
import Stores from "../../models"

const { OperatorStore } = Stores

class CreateOperator extends Component {
  state = {
      operator: "",
      init: "",
      errorInit: false,
      errorOperator: false,
      errorMessage: "",
  };


  handleConfirm = async () => {
    const {operator, init} = this.state
    try{
      await this.validateFields()
      OperatorStore.setSelectedOperator(operator)
      OperatorStore.addOperator(operator, init)
      this.props.history.push({pathname:'/'})
    }
    catch(error){
      this.setState({errorMessage: error.message})
    }
  }

  handleHomePage = () => {
    this.props.history.push({pathname:'/'})
  }

  handleBackToList = () => {
    this.props.history.push({pathname:'/listOperator'})
  }

  renderError = () => {
    const {errorMessage} = this.state
    return <Typography 
    style={{color:'red', fontWeight: 'bold',  margin:10}}>
      {errorMessage}
    </Typography>
  }

  validateFields = () => {
    const {operator, init} = this.state 
    let operatorFlag = false
    let initFlag = false

    if(operator === ""){
      this.setState({errorOperator: true})
      operatorFlag = true
    }
    if(init === ""){
      this.setState({errorInit: true})
      initFlag = true
    }
    if(!initFlag && !operatorFlag) return {}
    if(initFlag && operatorFlag) throw new Error("Os campos devem ser preenchidos")
    if(initFlag) throw new Error("Iniciais devem ser preenchidas")
    if(operatorFlag) throw new Error("Operador deve ser preenchido")
  }

  render() {
    const {errorOperator, errorInit} = this.state
    return (
      <Container>
        <Grid style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: 20 }}>
          <Grid item md={3} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography style={{marginBottom:20}}> Digite as informações requeridas</Typography>
             <TextField 
                error={errorOperator} 
                variant="outlined" 
                label= "Nome " 
                onChange={({target: { value }}) => this.setState({operator:value, errorOperator: false})} 
                style={{marginBottom:20}}/>
             <TextField 
                error={errorInit} 
                variant="outlined" 
                label= "Iniciais " 
                onChange={({target: { value }}) => this.setState({init: value, errorInit: false})} />
              {(errorInit || errorOperator) && (this.renderError())}
             <Button onClick={() => this.handleConfirm()}> Confirmar dados</Button>
             <Button onClick={() => this.handleBackToList()}>Voltar para a Lista de Operadores</Button>
             <Button onClick={() => this.handleHomePage()}>Voltar para a Home Page</Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
export default CreateOperator;
