<script lang="ts">
import { computed } from 'vue'

export default {
  props: {
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  setup (props) {
    const maxVisiblePage = 5
    const startPage = computed(() => {
      return props.currentPage > 2
        ? props.currentPage - 2
        : (props.currentPage - 2) === 0
          ? props.currentPage - 1
          : 1
    })
    const endPage = computed(() => {
      return Math.min(startPage.value + maxVisiblePage - 1, props.totalPages)
    })
    const isFirstPage = computed(() => {
      return props.currentPage === 1
    })
    const isLastPage = computed(() => {
      return props.currentPage === props.totalPages
    })
    const pages = computed(() => {
      let range: { number: number; isDisabled: boolean}[] = []
      for (let i = startPage.value; i <= endPage.value; i++) {
        range.push({
          number: i,
          isDisabled: i === props.currentPage
        })
      }
      return range
    })

    return {
      pages,
      isFirstPage,
      isLastPage
    }
  }
}
</script>
<template>
  <ul class="flex">
    <li
      class="pagination-button prev"
      :class="{ disabled: isFirstPage }"
      @click="$emit('goto', 1)">
      &#60;&#60;
    </li>
    <li
      class="pagination-button prev"
      :class="{ disabled: isFirstPage }"
      @click="$emit('prev')">
      &#60;
      </li>
    <li
      v-for="(page, idx) in pages"
      :key="idx"
      :class="{ active: currentPage === page.number}"
      class="pagination-button"
      @click="$emit('goto', page.number)">
      {{ page.number }}
    </li>
    <li
      class="pagination-button next"
      :class="{ disabled: isLastPage }"
      @click="$emit('next')">
      &#62;
    </li>
    <li
      class="pagination-button next"
      :class="{ disabled: isLastPage }"
      @click="$emit('goto', totalPages)">
      &#62;&#62;
    </li>
  </ul>
</template>
<style lang="scss">
.pagination-button {
  border: 1px solid rgb(90, 155, 253);
  border-radius: 2px;
  margin: 0.25rem;
  padding: 0px 8px;

  &:not(.disabled) {
    cursor: pointer;
  }

  &.active,
  &:hover:not(.disabled) {
    background: rgb(110, 141, 255);
    color: white;
  }

  &.disabled {
    border-color: gray;
    color: gray;
    pointer-events: none;
  }
}
</style>
