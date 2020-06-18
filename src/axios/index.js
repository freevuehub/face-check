import axios from 'axios'

export const postAddImage = async (form) => {
  try {
    const { data } = await axios.post('https://face.toybox7.net/api/register', form)

    return data
  } catch (err) {
    return err
  }
}

export const postFaceCheck = async (form) => {
  try {
    const { data } = await axios.post('https://face.toybox7.net/api/face_recognition', form)

    return data
  } catch (err) {
    return err
  }
}
