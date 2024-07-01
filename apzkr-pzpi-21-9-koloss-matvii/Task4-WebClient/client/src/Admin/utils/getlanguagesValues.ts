import { LANGUAGE_ARRAY } from "../consts";

export const getlanguagesValues = (data: any, key: string):string => {
    const languageData: Record<string, string> = {};

    LANGUAGE_ARRAY.forEach(lang => {
      const title = lang.title;
      languageData[title] = data[`${title.toLowerCase()}${key}` as keyof any] as string;
    });

    return JSON.stringify(languageData);
}