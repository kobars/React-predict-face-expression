import { v4 as uuidv4 } from 'uuid'

export const generateUID = (code, date) => {
    const uuid = uuidv4()
    return `${code}${uuid}${date}`
}

export const chunk = (arr, size) => arr.reduce(
    (acc, curr, index) => (index % size) ?
        acc : [...acc, arr.slice(index, index + size)],
    [])

export const COLORS = ['#55E6C1', '#2c3e50', '#3dc1d3', '#c44569', '#227093', '#8e44ad']; // '#3B3B98'

export const fetcher = async (path) => {
    const resFetch = await fetch(path)
    return resFetch.json()
}

export const groupBy = (items, key) => items.reduce(
    (result, item) => ({
        ...result,
        [item[key]]: [
            ...(result[item[key]] || []),
            item,
        ],
    }),
    {},
);

export const checkCount = (data) => {
    return data ? data.length : 0
}

export const countExpression = (validation, sourceExp) => {
    const undefinedData = checkCount(validation.undefined)
    const happy = checkCount(validation.happy)
    const sad = checkCount(validation.sad)
    const neutral = checkCount(validation.neutral)
    const angry = checkCount(validation.angry)
    const fear = checkCount(validation.fear)
    const surprise = checkCount(validation.surprise)
    return {
        criteria: sourceExp,
        validation: [
            { name: 'Happy', value: sourceExp === 'happy' ? happy + undefinedData : happy },
            { name: 'Sad', value: sourceExp === 'sad' ? sad + undefinedData : sad },
            { name: 'Neutral', value: sourceExp === 'neutral' ? neutral + undefinedData : neutral },
            { name: 'Angry', value: sourceExp === 'angry' ? angry + undefinedData : angry },
            { name: 'Fear', value: sourceExp === 'fear' ? fear + undefinedData : fear },
            { name: 'Surprise', value: sourceExp === 'surprise' ? surprise + undefinedData : surprise },
        ]
    }
}

export const generateReport = ({ happy, sad, neutral, angry, fear, surprise }) => {
    const happyValidation = groupBy(happy, 'validation')
    const sadValidation = groupBy(sad, 'validation')
    const angryValidation = groupBy(neutral, 'validation')
    const surpriseValidation = groupBy(angry, 'validation')
    const neutralValidation = groupBy(fear, 'validation')
    const fearValidation = groupBy(surprise, 'validation')
    return [
        countExpression(happyValidation, 'happy'),
        countExpression(sadValidation, 'sad'),
        countExpression(neutralValidation, 'neutral'),
        countExpression(angryValidation, 'angry'),
        countExpression(fearValidation, 'fear'),
        countExpression(surpriseValidation, 'surprise'),
    ]
}
