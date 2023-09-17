import { v2 as cloudinary } from 'cloudinary'
import { Readable } from 'stream'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
  cloud_name: 'dgqq6ppk6',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const upload = async (buffer: Buffer) => {
  let response: { url: string } = await new Promise((response, reject) => {
    let cloudStream = cloudinary.uploader.upload_stream(
      {
        folder: 'captcha',
      },
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          response(result)
        }
      }
    )

    new Readable({
      read() {
        this.push(buffer)
        this.push(null)
      },
    }).pipe(cloudStream)
  })

  return response.url
}
