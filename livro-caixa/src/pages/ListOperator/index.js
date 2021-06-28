import React, { Component } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { Container } from "./styles";
import Stores from '../../models'

const { OperatorStore } = Stores

class ListOperator extends Component {
  state = {
    operator: "",
    init: "",
    index: 0,
    errorMessage: ""
  };

  componentDidMount = () => {
    if(OperatorStore.selectedOperator === ""){
      OperatorStore.setSelectedOperator("Jorge")
    }
    const currentIndex = this.getIndex(OperatorStore.selectedOperator)
    this.setState({
      operator: OperatorStore.selectedOperator, 
      init: this.translateInitials(OperatorStore.selectedOperator),
      index: currentIndex})
  }

  translateInitials = (operator) => {
    let allOperators = JSON.parse(JSON.stringify(OperatorStore.operatorList))
    const foundOperator = allOperators.find((oneOperator) => oneOperator.operator === operator)
    if(!foundOperator) return ''
    return foundOperator.initials
  }

  getIndex = (operator) => {
    let allOperators = JSON.parse(JSON.stringify(OperatorStore.operatorList))
    const foundOperator = allOperators.find((oneOperator) => oneOperator.operator === operator)
    if(!foundOperator) return ''
    return foundOperator.index
  }

  validateColor = (index) => {
    const {index: stateIndex} = this.state
    if (index === stateIndex) return 'yellow'
    return 'white'
  }

  handleOperatorChange = (operator, index) => {
    OperatorStore.setSelectedOperator(operator)
    this.setState({operator: operator, init: this.translateInitials(operator), index})
  }

  goHome = () => {
    this.props.history.push({ pathname:"/" })
  }

  goCreate = () => {
    this.props.history.push({ pathname:"/createOperator" })
  }

  handleOperatorDeletion = () => {
    const { operator } = this.state
    try{
      OperatorStore.deleteOperator(operator)
      this.setState({operator: OperatorStore.selectedOperator, init: this.translateInitials(OperatorStore.selectedOperator), index: 0})
    }
    catch(error){
      this.setState({errorMessage: error.message})
    }
  }


  renderOperators = () => {
    const {operatorList} = OperatorStore

    const objeto = JSON.parse(JSON.stringify(operatorList))
    
      const allOperators = [...Array(objeto.length)].map((_,index) => {
      const value = objeto[index]

      return (
        <Button style={{backgroundColor: this.validateColor(index)}} onClick={() => this.handleOperatorChange(value.operator, index)}>{value.operator} {this.translateInitials(value.operator)}</Button>
      )
    })
    return allOperators
  }

  renderErrorMessage = () => {
    const { errorMessage } = this.state
    return (
      <Typography style={{color:'red', fontWeight:'bold'}}>{errorMessage}</Typography>
    )
  }

  render() {
    const { operator, init, errorMessage } = this.state
    return (
      <Container>
        <Grid style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: 20 }}>
          <Grid item md={3} style={{ display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <Typography>O seu operador atual é {operator} {init}</Typography>
          {this.renderOperators()}
          {errorMessage !== "" && (this.renderErrorMessage())}
          <Button variant="outlined" onClick={() => this.goCreate()} style={{margin: 10}}>
              Clique aqui para registrar um novo operador
          </Button>
          <Button style={{margin: 10}} variant="outlined" onClick={() => this.handleOperatorDeletion()}> Clique aqui para excluir um operador </Button>
          <Typography style={{margin: 10}}> Para voltar para Home Page <Button style={{marginLeft:10}}variant="outlined" onClick={() => this.goHome()}>clique aqui</Button>
          </Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default ListOperator;
