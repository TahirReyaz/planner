export const currentYear = new Date().getFullYear();
const years = [];
for (let i = 0; i < 8; i++) {
  const year = currentYear + i;
  years.push(year.toString());
}

export default years;
