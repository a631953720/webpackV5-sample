export default function getWeeklyEvent({ startTime, endTime, dayOfWeek = [], currentDate = new Date() }) {
  const { h: sh = 0, m: sm = 0, s: ss = 0 } = startTime;
  const { h: eh = 0, m: em = 0, s: es = 0 } = endTime;
  let startWeeks = [];
  let endWeeks = [];
  const t = {};
  // build hash table
  dayOfWeek.forEach((week) => t[week] = true);

  // const currentDate = new Date();
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  console.log(t);
  for (let i = 0; i < lastDay; i++) {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1).getDay();

    if (t[d]) {
      startWeeks.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1, sh, sm, ss));
      endWeeks.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1, eh, em, es));
    }
  }

  return {
    startWeeks: startWeeks.map((date) => date.toISOString()),
    endWeeks: endWeeks.map((date) => date.toISOString()),
  };
}