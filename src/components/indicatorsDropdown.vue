<template>
  <q-card class="q-pa-md">
    <div class="row">
      <div
        class="col-12 q-px-md"
        v-for="(index, i) in amount"
        :key="i"
        :name="i"
      >
        <q-select
          v-if="render"
          :options="indicators"
          v-model="model[i]"
          :label="'Indicador ' + (i + 1)"
          @update:model-value="DomRender()"
        />
      </div>
    </div>
  </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "indicators",
  props: {
    amount: {
      type: Number,
      required: true,
    },
  },
  setup() {
    return {
      model: [],
      render: ref(true),
      indicators: [
        { label: "Indicador 1", value: "1" },
        { label: "Indicador 2", value: "2" },
        { label: "Indicador 3", value: "3" },
        { label: "Indicador 4", value: "4" },
        { label: "Indicador 5", value: "5" },
        { label: "Indicador 6", value: "6" },
      ],
    };
  },
  watch: {
    amount(newValue, OldValue) {
      this.model = [];
      for (var i = 0; i < newValue; i++) {
        this.model.push();
      }
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.model.push([]);
      this.DomRender();
    },
    DomRender() {
      this.render = false;
      this.$nextTick(() => {
        this.render = true;
      });
      this.$emit("model", this.model);
    },
  },
});
</script>
