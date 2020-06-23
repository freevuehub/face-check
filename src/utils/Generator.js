import { postFaceCheck } from '../axios'

export function* fetchFaceImage(value) {
  while (true) {
    yield async () => {
      const formData = new FormData()

      formData.append('image', value)

      const response = await postFaceCheck(formData)

      return response
    }
  }
}
