export const currentYear = new Date().getFullYear();
const years = [];
for (let i = 0; i < 8; i++) {
  const year = currentYear + i;
  years.push(year.toString());
}

const lifeYears = [];
for (let i = 0; i < 100; i++) {
  const year = currentYear + i;
  lifeYears.push(year.toString());
}
export { lifeYears };

export default years;
