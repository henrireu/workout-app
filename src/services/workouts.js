import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/workouts'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getAllByUser = async (userId) => {
  try {
    const response = await axios.get(baseUrl);
    const allWorkouts = response.data;
    
    const userWorkouts = allWorkouts.filter(workout => workout.user.id === userId)
    return userWorkouts
  } catch (error) {
    console.error('Virhe getAllByUserissa:', error)
    throw error
  }
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deleteWorkout = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Error deleting workout', error);
    throw error
  }
}

export default { getAll, create, setToken, getAllByUser, deleteWorkout } 