<template>
  <q-card>
    <q-card-section>
      <div class="text-h5 text-center text-uppercase">{{ title }}</div>
    </q-card-section>
    <div class="row" v-for="(parameter, name) in model" :key="name">
      <div class="col-6" v-if="render">
        <q-toggle
          :label="parameter.label"
          v-model="parameter.value"
          @update:model-value="DomRender()"
        />
      </div>
      <div class="col-6">
        <q-select
          dense
          v-model="parameter.amount"
          v-if="parameter.amount && parameter.value"
          :options="[1, 2, 3]"
          :label="parameter.label"
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
  props: {},
  setup() {
    return {
      title: "Parametros",
      render: ref(true),
      model: [],
    };
  },
  beforeMount() {
    this.init();
  },
  methods: {
    init() {
      this.load();
      this.DomRender();
    },
    load() {
      this.model = this.mountObj();
    },
    mountObj() {
      return {
        breakEven: { label: "BreakEven", value: false, amount: 1 },
        trailingStop: { label: "TrailingStop", value: false, amount: 1 },
        partialDepartures: {
          label: "Saídas Parciais",
          value: false,
          amount: 1,
        },
        positionIncreases: {
          label: "Aumentos de posição",
          value: false,
          amount: 1,
        },
        martingale: { label: "Martingale", value: false },

        soros: { label: "Soros", value: false },
        dailyFinancialGoals: {
          label: "Metas financeiras diárias",
          value: false,
        },
        weeklyFinancialGoals: {
          label: "Metas financeiras semanais",
          value: false,
        },
        monthlyFinancialGoals: {
          label: "Metas financeiras mensais",
          value: false,
        },
        schedules: {
          label: "Horários ",
          value: false,
          amount: 1,
        },
      };
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
