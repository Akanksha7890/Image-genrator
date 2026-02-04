import UserModel from '../models/userModel.js'
import FormData from 'form-data'
import axios from 'axios'

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body
    const userId = req.userId  

    if (!userId || !prompt) {
      return res.json({ success: false, message: 'Missing Details' })
    }

    const user = await UserModel.findById(userId)

    if (!user) {
      return res.json({success: false, message: 'User not found' })
    }

    if (user.creditBalance <= 0) {
      return res.json({
        success: false,
        message: 'No Credit Balance',
        creditBalance: user.creditBalance
      })
      
    }

    const formData = new FormData()
    formData.append('prompt', prompt)

    const response = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formData,
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API,
          ...formData.getHeaders()
        },
        responseType: 'arraybuffer'
      }
    )
console.log("Clipdrop response data:", response.data);
    const base64Image = Buffer.from(response.data).toString('base64')
    const resultImage = `data:image/png;base64,${base64Image}`

    user.creditBalance -= 1
    await user.save()

    res.json({
      success: true,
      message: 'Image Generated',
      creditBalance: user.creditBalance,
      image: resultImage
    })

  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}
