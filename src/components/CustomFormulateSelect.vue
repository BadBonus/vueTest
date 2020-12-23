<template>
  <div
    :class="`CustomFormulateSelect formulate-input-element formulate-input-element--${context.type}`"
    :data-type="context.type"
  >
    <input
      type="select"
      v-model="context.model"
      v-bind="context.attributes"
      autocomplete="no"
      @keydown.enter.prevent="context.model = selection.label"
      @keydown.down.prevent="increment"
      @keydown.up.prevent="decrement"
      @click.prevent="openList"
      @blur="customBlur"
    />
    <ul
      v-if="filteredOptions.length || isOpenList"
      class="formulate-input-dropdown CustomFormulateSelect"
    >
      <li
        v-for="(option, index) in filteredOptions"
        :key="option.value"
        v-text="option.label"
        :data-is-selected="selection && selection.value === option.value"
        @mouseenter="selectedIndex = index"
        @click="context.model = selection.label"
      />
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    context: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedIndex: 0,
      isOpenList: false,
    };
  },
  watch: {
    model() {
      this.selectedIndex = 0;
    },
  },
  computed: {
    model() {
      return this.context.model;
    },
    selection() {
      if (this.filteredOptions[this.selectedIndex]) {
        return this.filteredOptions[this.selectedIndex];
      }
      return false;
    },
    filteredOptions() {
      if (Array.isArray(this.context.options) && this.context.model) {
        const isAlreadySelected = this.context.options.find(
          (option) => option.label === this.context.model
        );
        if (!isAlreadySelected) {
          return this.context.options.filter((option) =>
            option.label
              .toLowerCase()
              .includes(this.context.model.toLowerCase())
          );
        }
      }
      if (this.isOpenList) return this.context.options;
      return [];
    },
  },
  methods: {
    increment() {
      const length = this.filteredOptions.length;
      if (this.selectedIndex + 1 < length) {
        this.selectedIndex++;
      } else {
        this.selectedIndex = 0;
      }
    },
    decrement() {
      const length = this.filteredOptions.length;
      if (this.selectedIndex - 1 >= 0) {
        this.selectedIndex--;
      } else {
        this.selectedIndex = length - 1;
      }
    },
    openList() {
      this.isOpenList = true;
      if (Array.isArray(this.context.options) && this.context.model) {
      }
    },
    customBlur() {
      this.isOpenList = false;
      this.context.blurHandler();
    },
  },
};
</script>
<style lang="less">
@heightOfComponent: 1vw;

.CustomFormulateSelect {
  position: relative;
  height: @heightOfComponent;

  input {
    width: 100%;
    height: 100%;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    position: absolute;
    left: 0;
    top: @heightOfComponent+.5vw;
    margin: auto;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: auto;
  }
  li {
    width: 5vw;
    cursor: pointer;
  }
  li[data-is-selected] {
    background: red;
    color: #fff;
  }
}
</style>
