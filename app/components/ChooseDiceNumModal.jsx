import React, { Component } from 'react';
import { Modal, Button} from 'react-bootstrap';
import {connect} from 'react-redux'
import {updateDiceNum, calculateMoney} from '../firebaseFunctions'

class ChooseDiceNumModal extends Component {
  constructor(){
    super()
    this.rollDice = this.rollDice.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  //function that will generate a new dice value
  rollDice (diceNum){
    let newDiceNum;
    if (diceNum === 1) {
      newDiceNum = Math.ceil(Math.random() * (6));
    }
    if (diceNum === 2){
      newDiceNum = Math.ceil(Math.random() * (12));
    }
    return newDiceNum;
  }

  handleButtonClick(num){
    let turn = this.props.game.turn
    let players = this.props.game.players
    let user = this.props.user.name
    const playersObj = Object.keys(players)

    let currentPlayer;
    playersObj.forEach(player => {
      if (players[player].name === user) {
        currentPlayer = player
      }
    })

    this.props.closeModal()
    let diceVal = this.rollDice(num)
    updateDiceNum(diceVal)
  }

  render() {
    return (
      <div id="dice-modal" style={{height: 200}}>
        <Modal
          show={true}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title">Would you like to roll 1 die or 2 dice?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <Button onClick={() => {
                this.handleButtonClick(1)
              }}>1</Button>
              <Button onClick={() => {
                this.handleButtonClick(2)
              }}>2</Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default connect(state => {
  return {
    game: state.game,
    user: state.auth
  }
})(ChooseDiceNumModal)
