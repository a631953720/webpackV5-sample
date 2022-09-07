export default function getMonthlyEvent({ startTime, endTime, dayOfMonth = 1, currentDate = new Date() }) {
  const { h: sh = 0, m: sm = 0, s: ss = 0 } = startTime;
  const { h: eh = 0, m: em = 0, s: es = 0 } = endTime;
  const startMonths = [];
  const endMonths = [];

  // const currentDate = new Date();

  startMonths.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), dayOfMonth, sh, sm, ss));
  endMonths.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), dayOfMonth, eh, em, es));

  return {
    startMonths,
    endMonths
  };
}
