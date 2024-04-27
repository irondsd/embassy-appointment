import axios from 'axios'
import * as dotenv from 'dotenv'

dotenv.config()

const API_KEY = process.env.APILAYER_API_KEY

export const recognizeCaptcha = async (imgSrc: string) => {
  const options = {
    method: 'GET',
    url: `https://api.apilayer.com/image_to_text/url?url=${imgSrc}`,
    headers: {
      apikey: API_KEY,
    },
  }

  const { data } = await axios.request<{ all_text: string }>(options)

  const cleanedUp = data.all_text.replace(/\D/g, '')

  return cleanedUp
}
