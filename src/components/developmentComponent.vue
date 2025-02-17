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
                    <div class="project-image" v-for="imagem in imagens" :key="imagem.nome">
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
    </main>
</template>
<script>
export default {
    name: "principalComponent",
    data() {
        return {
            imagens: []
        }
    },
    created() {
        this.carregarImagens();
    },
    methods: {
        carregarImagens() {
            // Busca todas as imagens dentro de `src/assets/images/`
            const contexto = require.context('@/assets/img/projects', false, /\.(png|jpe?g|svg|webp)$/);
            
            // Mapeia os arquivos encontrados para um array de objetos
            this.imagens = contexto.keys().map((caminho) => ({
                nome: caminho.replace('./', '').replace(".png", "").replace(/-/g, " "), // Remove './' do início do nome
                caminho: contexto(caminho) // Obtém a URL da imagem processada pelo Webpack
            }));
        }
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