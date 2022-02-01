<template>
  <q-page class="flex flex-center q-mt-lg">
    <form @submit.prevent.stop="submit">
      <div class="row q-px-md q-mb-md">
        <div class="col-12 q-mb-sm">
          <div class="text-h4 text-primary text-center">{{ title }}</div>
          <q-separator />
        </div>
        <div class="col-12">
          <div class="text-body1 text-justify">{{ textSub }}</div>
        </div>
        <div class="col-12 embed-container">
          <iframe
            :src="youtubeLink"
            title="YouTube video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="col-12 q-mb-sm">
          <q-separator />
        </div>
        <div class="col-12 q-mb-sm">
          <q-input
            ref="nameRef"
            outlined
            v-model="name"
            label="Nome Completo"
            :rules="[
              (val) => !!val || '* Necessario',
              (val) => val.length > 9 || 'Minimo permitido de 10 caracteres',
            ]"
            lazy-rules
          />
        </div>
        <div class="col-12 q-mb-sm">
          <q-input
            outlined
            v-model="mail"
            ref="emailRef"
            label="Email"
            :rules="[(val) => !!val || 'Necessario', isValidEmail]"
          />
        </div>
        <div class="col-12 q-mb-sm">
          <q-input
            outlined
            v-model="phone"
            ref="phoneRef"
            label="Whatsapp"
            mask="(##) ##### - ####"
            unmasked-value
            :rules="[
              (val) => !!val || '* Necessario',
              (val) => val.length > 10 || '* Necessario',
            ]"
          />
        </div>
        <div class="col-12 q-mb-sm">
          <q-separator />
        </div>
        <div class="col-12 q-mb-sm">
          <div class="text-subtitle1">Quantidade de Indicadores</div>
          <q-slider
            class="q-px-md"
            v-model="indicatorsAmount"
            :min="1"
            :max="3"
            marker-labels
          />
          <span
            >Ao alterar a quantidade de indicadores, os indicadores são
            zerados</span
          >
        </div>

        <div class="col-12 q-mb-sm">
          <IndicatorsDropdown
            :amount="indicatorsAmount"
            @model="updateModelIndicators"
          />
        </div>

        <div class="col-12 q-mb-sm">
          <q-separator />
        </div>
        <div class="col-12 q-mb-sm">
          <Parameters @model="updateModelParameters" />
        </div>
        <div class="col-4 offset-4 q-my-sm self-center">
          <q-btn
            color="primary"
            class="full-width"
            label="Enviar"
            type="submit"
          />
        </div>
      </div>
    </form>
  </q-page>
</template>

<script>
import { ref } from "vue";
import Parameters from "../components/parameters.vue";
import IndicatorsDropdown from "../components/indicatorsDropdown.vue";
import request from "../api/request.js";

export default {
  components: {
    Parameters,
    IndicatorsDropdown,
  },
  setup() {
    const nameRef = ref(null);
    const emailRef = ref(null);
    const phoneRef = ref(null);

    return {
      title: "Formulario CMTrade",
      textSub:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
      youtubeLink: "https://www.youtube.com/embed/RBquludwBxM",

      //basic information
      name: ref(""),
      nameRef,
      mail: ref(""),
      emailRef,
      phone: ref(""),
      phoneRef,

      indicators: [],
      indicatorsAmount: ref(1),

      parameters: [],

      submit() {
        nameRef.value.validate();
        emailRef.value.validate();
        phoneRef.value.validate();

        if (
          !nameRef.value.hasError &&
          !emailRef.value.hasError &&
          !phoneRef.value.hasError
        ) {
          let data = {
            name: this.name,
            mail: this.mail,
            phone: this.phone,
            indicatorsAmount: this.indicatorsAmount,
            indicators: this.indicators,
            parameters: this.parameters
          };
          request
            .form(data)
            .then((result) => {
              // handle success
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            });
        }
      },
    };
  },
  watch: {
    indicatorsAmount() {
      this.indicators = [];
    },
  },
  methods: {
    updateModelIndicators(val) {
      this.indicators = val;
      console.log(this.indicators);
    },
    updateModelParameters(val) {
      this.parameters = val;
    },
    isValidEmail(val) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "E-mail invalido";
    },
  },
};
</script>
<style scoped>
.row {
  max-width: 740px !important;
}

.embed-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
  height: auto;
  margin-top: 15px;
  margin-bottom: 15px;
}
.embed-container iframe,
.embed-container object,
.embed-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
