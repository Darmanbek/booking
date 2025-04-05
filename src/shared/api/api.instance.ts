import axios from "axios"
import { BASE_URL } from "src/shared/config/url.config"

const api = axios.create({
	baseURL: BASE_URL
})

export { api }
