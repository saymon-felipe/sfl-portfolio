<template>
    <main>
        <div class="vertical" id="developmentContent1">
            <section class="floating2 long">
                <div class="tecnologies-list">
                    <div class="scroll-loop4">
                        <img src="@/assets/img/logos/html-css-js.png" title="HTML, CSS, JS">
                        <img src="@/assets/img/logos/vue.png" title="Vue.js">
                        <img src="@/assets/img/logos/jquery.png" title="Jquery">
                        <img src="@/assets/img/logos/react.png" title="React">
                        <img src="@/assets/img/logos/ionic.png" title="Ionic">
                        <img src="@/assets/img/logos/bootstrap.png" title="Bootstrap">
                        <img src="@/assets/img/logos/tailwind.png" title="Tailwind CSS">

                        <img src="@/assets/img/logos/html-css-js.png" title="HTML, CSS, JS">
                        <img src="@/assets/img/logos/vue.png" title="Vue.js">
                        <img src="@/assets/img/logos/jquery.png" title="Jquery">
                        <img src="@/assets/img/logos/react.png" title="React">
                        <img src="@/assets/img/logos/ionic.png" title="Ionic">
                        <img src="@/assets/img/logos/bootstrap.png" title="Bootstrap">
                        <img src="@/assets/img/logos/tailwind.png" title="Tailwind CSS">
                    </div>
                </div>
                <div class="card-informations">
                    <p>Front-end</p>
                </div>
            </section>
            <section class="floating2 long">
                <div class="tecnologies-list">
                    <div class="scroll-loop3">
                        <img src="@/assets/img/logos/figma-icon.png" title="Figma">
                        <img src="@/assets/img/logos/dribbble-icon.png" title="Dribbble">
                        <img src="@/assets/img/logos/xd.png" title="Adobe XD">
                        <img src="@/assets/img/logos/photoshop-icon.png" title="Adobe Photoshop">

                        <img src="@/assets/img/logos/figma-icon.png" title="Figma">
                        <img src="@/assets/img/logos/dribbble-icon.png" title="Dribbble">
                        <img src="@/assets/img/logos/xd.png" title="Adobe XD">
                        <img src="@/assets/img/logos/photoshop-icon.png" title="Adobe Photoshop">
                    </div>
                </div>
                <div class="card-informations">
                    <p>UX / UI</p>
                </div>
            </section>
        </div>
        <div id="projects">
            <section class="floating1">
                <div class="project-images">
                    <div class="project-image" v-for="imagem in imagens" :key="imagem.nome" v-on:click="modalContent = imagem">
                        <img :src="imagem.caminho" :alt="imagem.nome">
                        <p style="text-transform: capitalize;">{{ imagem.nome }}</p>
                    </div>
                </div>
                <div class="card-informations">
                    <p>Projects</p>
                </div>
            </section>
        </div>
        <div class="vertical" id="developmentContent2">
            <section class="floating2 long inverted">
                <div class="tecnologies-list">
                    <div class="scroll-loop2">
                        <img src="@/assets/img/logos/node.png" title="Node.js">
                        <img src="@/assets/img/logos/vb.png" title="VB.NET">
                        <img src="@/assets/img/logos/csharp.png" title="C#">
                        <img src="@/assets/img/logos/python.png" title="Python">
                        <img src="@/assets/img/logos/mysql.png" title="MySql">
                        <img src="@/assets/img/logos/sqlserver.png" title="SQL Server">

                        <img src="@/assets/img/logos/node.png" title="Node.js">
                        <img src="@/assets/img/logos/vb.png" title="VB.NET">
                        <img src="@/assets/img/logos/csharp.png" title="C#">
                        <img src="@/assets/img/logos/python.png" title="Python">
                        <img src="@/assets/img/logos/mysql.png" title="MySql">
                        <img src="@/assets/img/logos/sqlserver.png" title="SQL Server">
                    </div>
                </div>
                <div class="card-informations">
                    <p>Back-end</p>
                </div>
            </section>
            <section class="floating2 long inverted">
                <div class="tecnologies-list">
                    <div class="scroll-loop1">
                        <img src="@/assets/img/logos/docker.png" title="Docker">
                        <img src="@/assets/img/logos/aws.png" title="AWS">
                        <img src="@/assets/img/logos/git.png" title="Git">
                        <img src="@/assets/img/logos/github.png" title="Github">
                        <img src="@/assets/img/logos/netlify.png" title="Netlify">
                        <img src="@/assets/img/logos/heroku.png" title="Heroku">

                        <img src="@/assets/img/logos/docker.png" title="Docker">
                        <img src="@/assets/img/logos/aws.png" title="AWS">
                        <img src="@/assets/img/logos/git.png" title="Git">
                        <img src="@/assets/img/logos/github.png" title="Github">
                        <img src="@/assets/img/logos/netlify.png" title="Netlify">
                        <img src="@/assets/img/logos/heroku.png" title="Heroku">
                    </div>
                </div>
                <div class="card-informations">
                    <p>DevOps</p>
                </div>
            </section>
        </div>
        <modalComponent :modalContent="modalContent" @closeModal="modalContent = null"  />
    </main>
</template>
<script>
import { globalMethods } from '@/js/globalMethods';
import modalComponent from "./modalComponent.vue";

export default {
    name: "principalComponent",
    mixins: [globalMethods],
    data() {
        return {
            imagens: [],
            modalContent: null
        }
    },
    created() {
        this.carregarImagens();
    },
    methods: {
        carregarImagens() {
            this.imagens = [
                {
                    nome: "AgendasPro",
                    caminho: require("@/assets/img/projects/agendaspro.png"),
                    descricao: "Aplicativo de agendamentos para pequenas empresas."
                },
                {
                    nome: "CDA (E-Sports)",
                    caminho: require("@/assets/img/projects/cda.png"),
                    descricao: "Aplicativo desenvolvido para gerenciamento de tarefas."
                },
                {
                    nome: "Cademint",
                    caminho: require("@/assets/img/projects/cademint.png"),
                    descricao: "Site de apresentação do aplicativo Cademint, um app de gerenciamento de tarefas."
                },
                {
                    nome: "Cademint App",
                    caminho: require("@/assets/img/projects/cademint-system.png"),
                    descricao: "App de gerenciamento de tarefas."
                },
                {
                    nome: "Gourmetech",
                    caminho: require("@/assets/img/projects/gourmetech.png"),
                    descricao: "Sistema ERP para comércios de varejo e restaurantes."
                },
                {
                    nome: "IEQ Farol",
                    caminho: require("@/assets/img/projects/ieq-farol.png"),
                    descricao: "Site institucional de organização religiosa."
                },
                {
                    nome: "Mokaly",
                    caminho: require("@/assets/img/projects/mokaly.png"),
                    descricao: "Site de apresentação da Mokaly, um app de gerenciamento de equipes distribuídas."
                },
                {
                    nome: "Portal Aluno Solutto",
                    caminho: require("@/assets/img/projects/portal-aluno-solutto.png"),
                    descricao: "Página inicial do portal do aluno do sistema Solutto - ERP para franquias."
                },
                {
                    nome: "Rabsystems",
                    caminho: require("@/assets/img/projects/rabsystems.png"),
                    descricao: "Site corporativo da Rabsystems, agência WEB."
                },
                {
                    nome: "Rabsystems App",
                    caminho: require("@/assets/img/projects/rabsystems-system.png"),
                    descricao: "Sistema de gerenciamento de clientes da empresa Rabsystems."
                },
                {
                    nome: "Solutto",
                    caminho: require("@/assets/img/projects/solutto.png"),
                    descricao: "Sistema interno Solutto - ERP para franquias."
                },
                {
                    nome: "Time Travel Old",
                    caminho: require("@/assets/img/projects/time-travel-old.png"),
                    descricao: "Site de conspirações feito com um visual retrô anos 2000."
                },
                {
                    nome: "Yuume",
                    caminho: require("@/assets/img/projects/yuume.png"),
                    descricao: "Rede social para conexão de pessoas que preferem algo alternativo."
                }
            ];
        }
    },
    components: {
        modalComponent
    }
}
</script>
<style scoped>
main {
    display: flex;
    align-items: center;
    gap: 2rem;
    position: absolute;
}

section {
    overflow: hidden;
}
.project-images {
    padding: 1rem 1rem calc(20px + 1rem) 1rem;
    overflow-y: auto;
}

.project-image {
    position: relative;
    margin: 1rem 0;
    overflow: hidden;
    border-radius: 1vw;

    &:first-child {
        margin-top: 0;
    }

    &::last-child {
        margin-bottom: 0;
    }

    &::after {
        content: "";
        width: 100%;
        height: 60px;
        position: absolute;
        bottom: 5px;
        left: 0;
        border-radius: 0 0 1vw 1vw;
        background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 1));
    }

    & p {
        position: absolute;
        bottom: 20px;
        width: 100%;
        text-align: center;
        color: var(--white);
        z-index: 1;
    }
}

.tecnologies-list {
    max-height: calc(37vh - 1rem);;
    overflow: hidden;
    padding: 10px;

    & img {
        aspect-ratio: 1/1;
        object-fit: contain;
        width: 100%;
        height: initial;
        margin: 1rem 0;
    }
}
</style>