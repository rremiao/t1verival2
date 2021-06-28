import React, { Component } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { Container } from "./styles";
import Stores from '../../models'

const { OperatorStore, UserStore } = Stores
class MakeDeliveries extends Component {
  state = {
    operator: "",
    user: "",
    initials: "",
    index: 1
  };

  componentDidMount = async() => {
    if(OperatorStore.selectedOperator === ""){
      OperatorStore.setSelectedOperator("Jorge")
    }
    if(UserStore.user === ""){
      UserStore.setSelectedUser("Raquel")
    }
    const currentIndex = this.getUserIndex(UserStore.user)
    this.setState({
      operator: OperatorStore.selectedOperator,
      user: UserStore.user,
      index: currentIndex})
  }

  translateOperatorInitials = (operator) => {
    let allOperators = JSON.parse(JSON.stringify(OperatorStore.operatorList))
    const foundOperator = allOperators.find((oneOperator) => oneOperator.operator === operator)
    if(!foundOperator) return ''
    return foundOperator.initials
   }

   getOperatorIndex = (operator) => {
    let allOperators = JSON.parse(JSON.stringify(OperatorStore.operatorList))
    const foundOperator = allOperators.find((oneOperator) => oneOperator.operator === operator)
    return foundOperator.index
  }

  translateUserInitials = (user) => {
    let allUsers = JSON.parse(JSON.stringify(UserStore.userList))
    const foundUser = allUsers.find((oneUser) => oneUser.user === user)
    if(!foundUser) return ''
    return foundUser.initials
   }
   
  getUserIndex = (user) => {
    let allUsers = JSON.parse(JSON.stringify(UserStore.userList))
    const foundUser = allUsers.find((oneUser) => oneUser.user === user)
    return foundUser.index
  }

  goNextPage = (whereToGo) => {
    this.props.history.push({pathname: whereToGo})
  }

  render() {
    const {operator, user} = this.state
    const initials = this.translateUserInitials(user)
    const operatorInit = this.translateOperatorInitials(operator)
    return (
      <Container>
        <Grid style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: 20 }}>
          <Grid item md={3} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          TELA MOCK
          <Typography>O seu morador atual é {user} {initials}</Typography>
          <Button style={{margin:10}} onClick={() => this.goNextPage("/")}>Clique aqui para trocar de morador! </Button>
          <Typography style={{margin:10}}> O seu operador atual é: {operator} {operatorInit}</Typography>
          <Button style={{margin:10}} onClick={() => this.goNextPage("/")}>Clique aqui para trocar de operador!</Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default MakeDeliveries;
