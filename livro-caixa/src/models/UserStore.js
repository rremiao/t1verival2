import { makeAutoObservable } from 'mobx'

class UserStore {

    constructor() {
        makeAutoObservable(this)
    }

    user = ""

    userList = [{
        user: 'Raquel',
        initials: 'RT',
        rg: '122',
        nroApt: '12',
        index: 0,
    },
    {
        user: 'Vando',
        initials: 'VM',
        rg: '221',
        nroApt: '21',
        index: 1,
    },
    {
        user: 'Oliver',
        initials: 'OR',
        rg: '222',
        nroApt: '22',
        index: 2,
    },
    {
        user: 'Rodrigo',
        initials: 'RG',
        rg: '223',
        nroApt: '23',
        index: 3,
    },]

    setSelectedUser(user) {
        this.user = user
    }

    addUser(user, initials) {
        const {userList} = this
        userList.push(user)
        userList.push({user: user, initials: initials, index: userList.length})
    }

    deleteUser(user) {
        if(this.userList.length === 1) throw new Error("Não é possível deletar todos os Usuários")
        let allUsers = JSON.parse(JSON.stringify(this.userList))
        const foundUser = allUsers.find((oneUser) => oneUser.user === user)
        const indexOf = foundUser.index

        this.userList.splice(indexOf, 1)
        this.defaultAsFirst()
    }

    defaultAsFirst = async() => {
        for(let i=0; i < this.userList.length -1; i++){
            this.userList[0].index = i
        }
        this.setSelectedUser(this.userList[0].user)
    }
}


export default UserStore