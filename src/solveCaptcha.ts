import axios from 'axios'
import * as dotenv from 'dotenv'
import { Page } from 'playwright'

dotenv.config()

const API_KEY = process.env.RAPIDAPI_API_KEY

export const solveCaptcha = async (base64Img: string, page: Page) => {
  const encodedParams = new URLSearchParams()
  encodedParams.set('base64_content', base64Img)

  const options = {
    method: 'POST',
    url: 'https://image-captcha-solver.p.rapidapi.com/recognizeBase64',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'image-captcha-solver.p.rapidapi.com',
    },
    data: encodedParams,
  }

  try {
    const response: { data: { status: string; result: string } } = await axios.request(options)

    const result = response?.data?.result?.replace(/\D/g, '')

    if (response.data.status !== 'success' || result.length !== 6) {
      console.log(response.data)
      await page.screenshot({ path: `./screenshots/Error-${new Date().toISOString()}.png`, fullPage: true })
      throw new Error('Failed to solve captcha')
    }

    return result
  } catch (error) {
    console.error(error)
  }
}
