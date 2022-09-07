import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import getWeeklyEvent from './library/eventHandler/weeklyEvent';
import getDailyEvent from './library/eventHandler/dailyEvent';
import getMonthlyEvent from './library/eventHandler/monthlyEvent';
import { onLoading, closeLoading } from './library/utils';
import './css/index.css'

function generateMockEvent(currentDate = new Date()) {
  const mock1 = getWeeklyEvent({ startTime: { h: 9, m: 30, s: 0 }, endTime: { h: 10, m: 0, s: 0 }, dayOfWeek: [1], currentDate });
  const mock2 = getWeeklyEvent({ startTime: { h: 10, m: 30, s: 0 }, endTime: { h: 12, m: 0, s: 0 }, dayOfWeek: [2], currentDate });
  const mock3 = getDailyEvent({ startTime: { h: 19, m: 30, s: 0 }, endTime: { h: 23, m: 59, s: 0 }, currentDate });
  const mock4 = getMonthlyEvent({ startTime: { h: 14, m: 30, s: 0 }, endTime: { h: 16, m: 30, s: 0 }, dayOfMonth: 5, currentDate });
  return Array().concat(
    mock1.startWeeks.map((week, i) => ({
      title: 'on',
      start: week,
      end: mock1.endWeeks[i],
      color: 'rgb(55, 128, 6)',
    })),
    mock2.startWeeks.map((week, i) => ({
      title: 'off',
      start: week,
      end: mock2.endWeeks[i],
      color: 'rgb(227 47 47)',
    })),
    mock3.startDays.map((day, i) => ({
      title: 'auto',
      start: day,
      end: mock3.endDays[i],
      color: 'rgb(227 140 47)',
    })),
    mock4.startMonths.map((month, i) => ({
      title: 'on',
      start: month,
      end: mock4.endMonths[i],
      color: 'rgb(55, 128, 6)',
    }))
  );
}

let mockEvents = generateMockEvent();
const calendarEl = document.getElementById('test');
const calendar = new Calendar(calendarEl, {
  plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    // left: 'prev,next today',
    left: 'customPrev,customNext today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,listWeek',
  },
  displayEventEnd: true,
  eventTimeFormat: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    // display PM or AM
    meridiem: false,
  },
  customButtons: {
    customNext: {
      text: 'next',
      click: function () {
        onLoading();
        setTimeout(() => {
          calendar.next();
          const currentDate = calendar.getDate();
          const tmp = generateMockEvent(new Date(currentDate.getFullYear(), currentDate.getMonth()));
          console.log(tmp);
          calendar.removeAllEvents();
          tmp.forEach((e) => calendar.addEvent(e));
          closeLoading();
        });
      },
    },
    customPrev: {
      text: 'prev',
      click: function () {
        onLoading();
        setTimeout(() => {
          calendar.prev();
          const currentDate = calendar.getDate();
          const tmp = generateMockEvent(new Date(currentDate.getFullYear(), currentDate.getMonth()));
          console.log(tmp);
          calendar.removeAllEvents();
          tmp.forEach((e) => calendar.addEvent(e));
          closeLoading();
        });
      },
    },
  },
  nowIndicator: true,
  events: mockEvents,
  // events: [
  //   {
  //     title: 'on',
  //     start: '2022-09-04T09:15:00',
  //     color: '#378006',
  //   },
  //   {
  //     title: 'auto',
  //     start: '2022-09-04T09:30:00',
  //   },
  //   {
  //     title: 'on',
  //     start: '2022-09-04T12:00:00',
  //   },
  //   {
  //     title: 'auto',
  //     start: '2022-09-04T13:30:00',
  //   },
  //   {
  //     title: 'of',
  //     start: '2022-09-04T18:30:00',
  //   },
  // ],
});

calendar.render();
