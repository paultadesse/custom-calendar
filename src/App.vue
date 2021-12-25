<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <Calendar /> -->
    <div class="calendar-layout">
      <component
        :is="datePicker"
        :day-key="displayKey"
        v-model="dateSelection"
        @drag="dragSelection = $event"
      >
      </component>
    </div>
    <div class="sidebar">
      <h4>Mode</h4>
      <div class="option" v-for="(option, index) in selectModeOptions" :key="index">
        <input
          type="radio"
          :id="option.id"
          :value="option.value"
          v-model="selectMode"
        />
        <label :for="option.id">{{ option.label }}</label>
      </div>
      <h4>Value</h4>
      <div v-if="dateSelection">
        <p v-if="selectMode === 'single'">{{ dateSelection }}</p>
        <p v-if="selectMode === 'multiple'">
          <span v-for="(date,index) in dateSelection" :key="index">{{ date }}</span>
        </p>
        <div v-if="selectMode === 'range'">
          <p>start: {{ dateSelection.start }}</p>
          <p>end: {{ dateSelection.end }}</p>
        </div>
      </div>
      <div v-else>None</div>
      <div v-if="selectMode === 'range'">
        <h4>Drag</h4>
        <div v-if="dragSelection">
          <p>start: {{ dragSelection.start }}</p>
          <p>end: {{ dragSelection.end }}</p>
        </div>
        <div v-else>None</div>
      </div>
    </div>
  </div>
</template>

<script>
// import Calendar from "./components/Calendar.vue";
// import HelloWorld from './components/HelloWorld.vue'
import { _displayKeyOptions, _selectModeOptions } from "./calendardata";
import Calendar from "./components/Calendar.vue";
import singleDatePicker from "./components/single-date-picker.vue";

export default {
  components: {
    singleDatePicker: singleDatePicker,
    Calendar: Calendar,
  },
  data() {
    return {
      singleDatePicker: singleDatePicker,
      calendar: Calendar,
      displayKeyOptions: _displayKeyOptions,
      displayKey: _displayKeyOptions[1].value,
      selectModeOptions: _selectModeOptions,
      selectMode: _selectModeOptions[1].value,
      showCustomUI: false,
      dateSelection: null,
      dragSelection: null,
    };
  },
  computed: {
    datePicker() {
      switch (this.selectMode) {
        case "single":
          return this.singleDatePicker;
        case "multiple":
          return this.calendar;
        case "range":
          return this.calendar;
        default:
          return "";
      }
    },
    dateSelectionLabel() {
      return JSON.stringify(this.dateSelection, null, "\t");
    },
  },
  watch: {
    selectMode() {
      this.dateSelection = null;
    },
  },
};
</script>

<style lang="sass">
$themeColor: #ff7a58

$headerPadding: 0.5rem 1rem
$headerBorderWidth: 1px
$headerBorderStyle: solid
$headerBorderColor: #aaaaaa
$headerBackground: $themeColor
$headerColor: white

$weekdayPadding: 0.4rem 0
$weekdayColor: #7a7a7a
$weekdayBorderWidth: 1px
$weekdayBorderStyle: solid
$weekdayBorderColor: #aaaaaa
$weekdayBackground: #eaeaea

$dayColor: #3a3a3a
$dayBorder: solid 1px #aaaaaa
$dayBackgroundColor: white
$dayWidth: 14.2857%
$dayHeight: 50px

$todayColor: white
$todayBackgroundColor: $themeColor

$notInMonthColor: #cacaca
$notInMonthBackgroundColor: #fafafa

$selectedColor: #fafafa
$selectedBackgroundColor: #5e7fa0

$draggedColor: #fafafa
$draggedBackgroundColor: #8ca7c2

$fontFamily: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif

*
  box-sizing: border-box

#app
  display: flex
  font-family: $fontFamily
  padding: 20px

.calendar-layout
  min-width: 400px

.calendar
  display: flex
  flex-direction: column

.header
  display: flex
  justify-content: stretch
  align-items: center
  color: $headerColor
  padding: $headerPadding
  border-width: $headerBorderWidth
  border-style: $headerBorderStyle
  border-color: $headerBorderColor
  background-color: $headerBackground

  =pointer()
    cursor: pointer
    &:hover
      color: #dcdcdc

  .arrow
    +pointer
    padding: 0 0.4em 0.2em 0.4em
    font-size: 1.8rem
    font-weight: 500
    user-select: none
    flex-grow: 0

  .title
    +pointer
    flex-grow: 1
    font-size: 1.2rem
    text-align: center

.weekdays
  display: flex

.weekday
  width: $dayWidth
  display: flex
  justify-content: center
  align-items: center
  padding: $weekdayPadding
  color: $weekdayColor
  border-width: $weekdayBorderWidth
  border-style: $weekdayBorderStyle
  border-color: $weekdayBorderColor
  background-color: $weekdayBackground
  cursor: default

.week
  display: flex

.day
  width: $dayWidth
  height: $dayHeight
  display: flex
  justify-content: center
  align-items: center
  color: $dayColor
  background-color: $dayBackgroundColor
  border: $dayBorder
  cursor: default

.today
  font-weight: 500
  color: $todayColor
  background-color: $todayBackgroundColor

.not-in-month
  color: $notInMonthColor
  background-color: $notInMonthBackgroundColor

.selected
  color: $selectedColor
  background-color: $selectedBackgroundColor

.dragged
  color: $draggedColor
  background-color: $draggedBackgroundColor

.sidebar
  margin-left: 20px

  h4
    font-size: 1.2rem
    font-weight: 500
    margin-top: 20px
    margin-bottom: 10px

  .option
    margin-top: 5px
</style>
