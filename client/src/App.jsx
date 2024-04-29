import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import './App.css'
import Input from '../components/Input'

function App() {
  const [score, setScore] = useState({})
  const [allScores, setAllScores] = useState([])
  const socket = io('localhost:3000')

  const connectSocket = () => {
    socket.on('connection', (socket) => {
      console.log(socket)
    } )

  }
  const handleInput = (event) => {
    let { name, value } = event.target
    // console.log({ [name]: value })
    let currentObj = {[name]: value}
    
    setScore((prev) => ({...prev,...currentObj }))
  }
  
  const sendScores = () => {
    socket.emit('scores', score)
    socket.on('playerScores', (playerScores) => {
      // console.log(playerScores)
      setAllScores(playerScores)
    })
  }
  // console.log(score)

  useEffect(() => {
    connectSocket()
  }, [])

  return (
    <>
      <h1>React Multiplayer Dashboard</h1>
      <Input 
        name = "name"
        placeholder='Enter your name'
        handleInput={handleInput}
      />
      <Input 
        name = "score"
        placeholder='Enter your score'
        handleInput={handleInput}
      />

      <button 
        className='send-scores' 
        onClick={sendScores}
      >
        Publish Score
      </button>
    { allScores.length > 0 ? <table>
        <tbody>
          <tr>
            <th>Player</th>
            <th>Score</th>
          </tr>
            {allScores.map((score) => (
              <tr key={score.id}>
                <td>{score?.name}</td>
                <td>{score?.score}</td>
              </tr>
            ))}
        </tbody>
      </table> : <></>
    }
    </>
  )
}

export default App
