<template>
    <main>
        <section class="square floating1 pointer" id="development" title="Development" @click="goToDevelopment()" subtitle="See my skills and projects.">
            <i style="margin-top: -15%;">💻</i>
            <div class="card-informations">
                <p>Development</p>
            </div>
            <p class="double-click">&gt; <span>Click</span> &lt;</p>
        </section>
        <section class="photo floating2" id="principal" title="Fullstack engineer & Author" subtitle="Age: 23y, Interests: Technology, Literature">
            <div>
                <img src="../assets/img/sfl-photo.png">
            </div>
            <div class="card-informations">
                <i>⚙</i>
                <div>
                    <h2>Saymon Felipe</h2>
                    <span>Software Engineer</span>
                </div>
            </div>
        </section>
        <section class="square floating3 pointer" id="literature" title="Literature" subtitle="See my most recent books.">
            <i style="margin-top: -15%;">📖</i>
            <div class="card-informations">
                <p>Literature</p>
            </div>
            <p class="double-click">&gt; <span>Click</span> &lt;</p>
        </section>
    </main>
</template>
<script>
export default {
    name: "principalComponent",
    methods: {
        goToDevelopment: function () {
            this.$emit("changeView", "development");
        }
    }
}
</script>
<style scoped>
main {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    height: 100vh;
    width: 100vw;

    & section {
        z-index: 2;
    }
}
</style>