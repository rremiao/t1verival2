import { makeAutoObservable } from 'mobx'

class OperatorStore {
    constructor() {
        makeAutoObservable(this)
    }

    selectedOperator = ""

    operatorList = [
    {   operator: 'Jorge',
        initials: 'JG',
        index: 0,
    },
    {
        operator: 'Vanessa',
        initials: 'VV',
        index: 1,
    }, 
    {
        operator: 'Andrigo', 
        initials: 'AG',
        index: 2,
    }]

    addOperator(operator, initials) {
        const {operatorList} = this
        operatorList.push({operator: operator, initials: initials, index: operatorList.length})
    }

    deleteOperator(operator) {
        if(this.operatorList.length === 1) throw new Error("Não é possível deletar todos os Operadores")
        let allOperators = JSON.parse(JSON.stringify(this.operatorList))
        const foundOperator = allOperators.find((oneOperator) => oneOperator.operator === operator)
        const indexOf = foundOperator.index
        this.operatorList.splice(indexOf, 1)
        this.defaultAsFirst()
    }

    defaultAsFirst = async() => {
        for(let i=0; i < this.operatorList.length -1; i++){
            this.operatorList[0].index = i
        }
        this.setSelectedOperator(this.operatorList[0].operator)
    }

    setSelectedOperator(operator) {
        this.selectedOperator = operator
    }
}

export default OperatorStore