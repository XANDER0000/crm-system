export const convertDate = (date: string | Date) => {
	if (!date) return '';
  
  const dateNew = new Date(date);
	return dateNew.toLocaleDateString('ru-RU');
}
