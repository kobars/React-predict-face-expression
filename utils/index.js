import { v4 as uuidv4 } from 'uuid'

export const generateUID = (code, date) => {
    const uuid = uuidv4()
    return `${code}${uuid}${date}`
}