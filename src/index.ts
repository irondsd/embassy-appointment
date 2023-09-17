import { chromium } from 'playwright'
import { recognizeCaptcha } from './ocr'
import { upload } from './uploadImg'
import dotenv from 'dotenv'

dotenv.config()

const URL = process.env.URL

const img_id = '#ctl00_MainContent_imgSecNum'
const input_id = '#ctl00_MainContent_txtCode'
const next_btn_id = '#ctl00_MainContent_ButtonA'
const next_btn_id_b = '#ctl00_MainContent_ButtonB'
const table_list_id = '#ctl00_MainContent_RadioButtonList1'
const submit_btn_id = '#ctl00_MainContent_Button1'
const no_slots_id =
  'p:text("Извините, но в настоящий момент на интересующее Вас консульское действие в системе предварительной записи нет свободного времени.")'

const main = async () => {
  // Launch a Chromium browser instance
  const browser = await chromium.launch({ headless: false })
  // Create a new browser context
  const context = await browser.newContext()
  // Create a new page in the browser context
  const page = await context.newPage()
  // Navigate to a website
  await page.goto(URL)
  const img = await page.$(img_id)
  //   const src = await img.getAttribute('src')
  const captchaImageBuffer = await img.screenshot()
  const uploadedUrl = await upload(captchaImageBuffer)
  console.log(`img uploaded successfully: ${uploadedUrl}`)
  const captchaResult = await recognizeCaptcha(uploadedUrl)
  console.log(`capcha solved: ${captchaResult}`)
  await page.locator(input_id).type(captchaResult)
  await page.locator(next_btn_id).click()
  await page.locator(next_btn_id_b).click()
  const no_slots = await page.$(no_slots_id)
  if (!no_slots) {
    console.log('sorry, no slots available')
    await page.screenshot({ path: `./screenshots/${new Date().toISOString()}.png`, fullPage: true })
    await browser.close()
  } else {
    const table = await page.$(table_list_id)
    const available = await table.$$('td')
    await available[0].click()
    await page.waitForTimeout(500)
    await page.locator(submit_btn_id).click()
    console.log('successfully made an appointment')
    await page.screenshot({ path: `./screenshots/${new Date().toISOString()}.png`, fullPage: true })
    await browser.close()
  }
}

main()
