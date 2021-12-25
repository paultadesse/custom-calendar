<script>
import calendar from "./Calendar.vue";
export default {

  created() {
    this.$on("configureDay", this.configureDay);
    this.$on("selectDay", this.selectDay);
  },
  extends: calendar,
  props: {
    value: Date,
  },
  computed: {
    hasValue() {
      return this.value && typeof this.value.getTime === "function";
    },
    valueTime() {
      return this.hasValue ? this.value.getTime() : null;
    },
  },
  methods: {
    configureDay(day) {
      day.isSelected = day.date.getTime() === this.valueTime;
    },
    selectDay(day) {
      this.$emit("input", day.isSelected ? null : day.date);
    },
  },
};
</script>
<style lang=""></style>
