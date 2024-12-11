import axios from 'axios'
import { ApiResponse, Person, Species } from './types/response'

export const initialSpeciesUrl = 'https://swapi.dev/api/species/'
export const fetchSpecies = async (url: string) => {
    const response = await axios.get<ApiResponse<Species>>(url)
    return response.data
}
export const initialPeopleUrl = 'https://swapi.dev/api/people/'
export const fetchPeople = async (url: string) => {
    const response = await axios.get<ApiResponse<Person>>(url)
    return response.data
}
