export default function getDailyEvent({ startTime, endTime, currentDate = new Date() }) {
  const { h: sh = 0, m: sm = 0, s: ss = 0 } = startTime;
  const { h: eh = 0, m: em = 0, s: es = 0 } = endTime;
  const startDays = [];
  const endDays = [];

  // const currentDate = new Date();
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  for (let i = 0; i < lastDay; i++) {
    startDays.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1, sh, sm, ss));
    endDays.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1, eh, em, es));
  }

  return {
    startDays,
    endDays
  };
}
