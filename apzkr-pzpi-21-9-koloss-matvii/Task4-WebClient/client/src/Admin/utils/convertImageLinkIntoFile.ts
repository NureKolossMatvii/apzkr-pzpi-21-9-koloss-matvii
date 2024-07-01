export const convertImageLinkIntoFile = async (imageUrl:string, fileName:string):Promise<File | undefined> => {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        return new File([blob], fileName);
      } catch (error) {
        console.error('Error fetching or creating File:', error);
        return undefined;
      }
}