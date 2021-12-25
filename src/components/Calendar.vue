<template id="calendar">
  <div class="calendar">
    <div class="header">
      <a class="arrow" @click="movePreviousYear">&laquo;</a>
      <a class="arrow" @click="movePreviousMonth">&lsaquo;</a>
      <span class="title" @click="moveThisMonth">
        {{ header.label }}
      </span>
      <a class="arrow" @click="moveNextMonth">&rsaquo;</a>
      <a class="arrow" @click="moveNextYear">&raquo;</a>
    </div>
    <div class="weekdays">
      <div class="weekday" v-for="weekday in weekdays" :key="weekday">
        {{ weekday.label_3 }}
      </div>
    </div>
    <div class="week" v-for="week in weeks" :key="week">
      <div
        class="day"
        :class="{
          today: day.isToday,
          'not-in-month': !day.inMonth,
          selected: day.isSelected && !day.dragActive,
          dragged: day.isDragged,
        }"
        v-for="day in week"
        :key="day"
        @click="$emit('selectDay', day)"
        @mouseenter="$emit('enterDay', day)"
        @mouseleave="$emit('leaveDay', day)"
      >
        {{ day[dayKey] }}
      </div>
    </div>
  </div>
</template>
<script>
import {
  _daysInMonths,
  _weekdayLabels,
  _monthLabels,
  _todayComps,
} from "../calendardata";
export default {
  template: '#calendar',
  data() {
    return {
      month: _todayComps.month,
      year: _todayComps.year,
    };
  },
  props: {
    dayKey: { type: String, default: "label" },
  },
  computed: {
    // Our component exposes month as 1-based, but sometimes we need 0-based
    monthIndex() {
      return this.month - 1;
    },
    isLeapYear() {
      return (
        (this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0
      );
    },
    // Day/month/year components for previous month
    previousMonthComps() {
      if (this.month === 1)
        return {
          days: _daysInMonths[11],
          month: 12,
          year: this.year - 1,
        };
      return {
        days:
          this.month === 3 && this.isLeapYear
            ? 29
            : _daysInMonths[this.month - 2],
        month: this.month - 1,
        year: this.year,
      };
    },
    // Day/month/year components for next month
    nextMonthComps() {
      if (this.month === 12)
        return {
          days: _daysInMonths[0],
          month: 1,
          year: this.year + 1,
        };
      return {
        days:
          this.month === 2 && this.isLeapYear ? 29 : _daysInMonths[this.month],
        month: this.month + 1,
        year: this.year,
      };
    },
    // State for calendar header (no dependencies yet...)
    months() {
      return _monthLabels.map((ml, i) => ({
        label: ml,
        label_1: ml.substring(0, 1),
        label_2: ml.substring(0, 2),
        label_3: ml.substring(0, 3),
        number: i + 1,
      }));
    },
    // State for weekday header (no dependencies yet...)
    weekdays() {
      return _weekdayLabels.map((wl, i) => ({
        label: wl,
        label_1: wl.substring(0, 1),
        label_2: wl.substring(0, 2),
        label_3: wl.substring(0, 3),
        number: i + 1,
      }));
    },
    // State for calendar header
    header() {
      const month = this.months[this.monthIndex];
      return {
        month: month,
        year: this.year.toString(),
        shortYear: this.year.toString().substring(2, 4),
        label: month.label + " " + this.year,
      };
    },
    // Returns number for first weekday (1-7), starting from Sunday
    firstWeekdayInMonth() {
      return new Date(this.year, this.monthIndex, 1).getDay() + 1;
    },
    // Returns number of days in the current month
    daysInMonth() {
      // Check for February in a leap year
      if (this.month === 2 && this.isLeapYear) return 29;
      // ...Just a normal month
      return _daysInMonths[this.monthIndex];
    },
    weeks() {
      const weeks = [];
      let previousMonth = true,
        thisMonth = false,
        nextMonth = false;
      let day = this.previousMonthComps.days - this.firstWeekdayInMonth + 2;
      let month = this.previousMonthComps.month;
      let year = this.previousMonthComps.year;
      // Cycle through each week of the month, up to 6 total
      for (let w = 1; w <= 6 && !nextMonth; w++) {
        // Cycle through each weekday
        const week = [];
        for (let d = 1; d <= 7; d++) {
          // We need to know when to start counting actual month days
          if (previousMonth && d >= this.firstWeekdayInMonth) {
            // Reset day/month/year counters
            day = 1;
            month = this.month;
            year = this.year;
            // ...and flag we're tracking actual month days
            previousMonth = false;
            thisMonth = true;
          }

          // Append day info for the current week
          // Note: this might or might not be an actual month day
          //  We don't know how the UI wants to display various days,
          //  so we'll supply all the data we can
          const dayInfo = {
            label: day && thisMonth ? day.toString() : "",
            day,
            weekday: d,
            week: w,
            month,
            year,
            date: new Date(year, month - 1, day),
            beforeMonth: previousMonth,
            afterMonth: nextMonth,
            inMonth: thisMonth,
            isToday:
              day === _todayComps.day &&
              month === _todayComps.month &&
              year === _todayComps.year,
            isFirstDay: thisMonth && day === 1,
            isLastDay: thisMonth && day === this.daysInMonth,
          };
          this.$emit("configureDay", dayInfo);
          week.push(dayInfo);

          // We've hit the last day of the month
          if (thisMonth && day >= this.daysInMonth) {
            thisMonth = false;
            nextMonth = true;
            day = 1;
            month = this.nextMonthComps.month;
            year = this.nextMonthComps.year;
            // Still in the middle of the month (hasn't ended yet)
          } else {
            day++;
          }
        }
        // Append week info for the month
        weeks.push(week);
      }
      return weeks;
    },
  },
  methods: {
    moveThisMonth() {
      this.month = _todayComps.month;
      this.year = _todayComps.year;
    },
    moveNextMonth() {
      const { month, year } = this.nextMonthComps;
      this.month = month;
      this.year = year;
    },
    movePreviousMonth() {
      const { month, year } = this.previousMonthComps;
      this.month = month;
      this.year = year;
    },
    moveNextYear() {
      this.year++;
    },
    movePreviousYear() {
      this.year--;
    },
  },
};
</script>
<style lang="sass">

</style>
