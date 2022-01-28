<template>
  <q-card>
    <q-tabs
      v-model="tab"
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab
        v-for="(index, i) in amount"
        :key="i"
        :name="i"
        :label="'Indicador ' + (i + 1)"
      />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel v-for="(index, i) in amount" :key="i" :name="i">
        <div>
          <div
            class="row"
            v-for="(parameter, name) in model[i]"
            :key="name + i"
          >
            <div class="col-6">
              <q-toggle
                :label="parameter.label"
                v-model="parameter.value"
                @update:model-value="render()"
              />
            </div>
            <div class="col-6">
              <q-select
                dense
                v-model="parameter.amount"
                v-if="parameter.amount && parameter.value"
                :options="[1, 2, 3]"
                :label="parameter.label"
                @update:model-value="render()"
              />
            </div>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
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
      tab: ref(0),
      model: [],
    };
  },
  watch: {
    amount(newValue, OldValue) {
      this.model = [];
      for (var i = 0; i < newValue; i++) {
        this.model.push([]);
      }
      this.load();
    },
    model(newValue, OldValue) {
      console.log(newValue);
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.model.push([]);
      this.load();
      this.render();
    },
    load() {
      this.model.forEach((el, i) => {
        this.model[i] = this.mountObj();
      });
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
    render() {
      let aux = this.tab;
      this.tab = 3;
      this.$nextTick(() => {
        this.tab = aux;
      });
      this.$emit("model", this.model);
    },
  },
});
</script>
