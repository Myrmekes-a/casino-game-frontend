<template>
    <router-link 
        v-bind:to="'/' + homeGetLink"
        class="home-game-element"
        v-bind:style="{ 'height': homeHeight + 'px' }"
        ref="gameLink"
    >
        <img v-bind:src="homeGameImage" alt="" />
    </router-link>
</template>

<script>
    const gameImages = {
        slots: require('@/assets/img/games/backup/slots.png'),
        battles: require('@/assets/img/games/backup/battles.png'),
        crash: require('@/assets/img/games/backup/crash.png'),
        duels: require('@/assets/img/games/backup/duels.png'),
        roll: require('@/assets/img/games/backup/roll.png'),
        cases: require('@/assets/img/games/backup/cases.png'),
        unbox: require('@/assets/img/games/backup/cases.png'),
        upgrader: require('@/assets/img/games/backup/upgrader.webp'),
        blackjack: require('@/assets/img/games/backup/blackjack.png'),
        mines: require('@/assets/img/games/backup/mines.png'),
        towers: require('@/assets/img/games/backup/towers.png'),
    };
    const placeholderImg = require('@/assets/img/games/backup/roll.png');

    export default {
        name: 'HomePlaceholderElement',
        props: [
            'game'
        ],
        data() {
            return {
                homeHeight: 170
            }
        },
        methods: {
            homeSetHeight() {
                const ref = this.$refs.gameLink;
                if (!ref || !ref.$el) return;
                const w = ref.$el.getBoundingClientRect().width;
                this.homeHeight = Number((w * 0.574324).toFixed(4));
            }
        },
        computed: {
            homeGetLink() {
                let link = this.game;

                if(link === 'cases') { link = 'unbox'; }

                return link;
            },
            homeGameImage() {
                return gameImages[this.game] || placeholderImg;
            }
        },
        mounted() {
            window.addEventListener('resize', this.homeSetHeight);
            this.homeSetHeight();
        },
        destroyed() { 
            window.removeEventListener('resize', this.homeSetHeight); 
        }
    }
</script>

<style scoped>
    a.home-game-element {
        height: 150px;
        width: calc(25% - 17px);
        margin-top: 25px;
        margin-right: 25px;
        transition: transform 0.3s ease;
    }

    a.home-game-element:hover {
        transform: scale(1.03);
    }

    a.home-game-element:nth-child(1),
    a.home-game-element:nth-child(2),
    a.home-game-element:nth-child(3),
    a.home-game-element:nth-child(4) {
        margin-top: 0;
    }

    a.home-game-element:nth-child(4n) {
        margin-right: 0;
    }

    a.home-game-element img {
        width: 100%;
        height: 100%;
    }

    @media only screen and (max-width: 1050px) {

        a.home-game-element {
            width: calc(25% - 11.25px);
            margin-right: 15px;
        }

    }

    @media only screen and (max-width: 800px) {

        a.home-game-element {
            width: calc(50% - 7.5px);
            margin-top: 15px;
        }

        a.home-game-element:nth-child(3),
        a.home-game-element:nth-child(4) {
            margin-top: 15px;
        }

        a.home-game-element:nth-child(2n) {
            margin-right: 0;
        }
    }

    @media only screen and (max-width: 450px) {

        a.home-game-element {
            height: 95px;
        }

    }
</style>