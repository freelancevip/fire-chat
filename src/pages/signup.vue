<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-title>Fire Chat App</f7-nav-title>
        </f7-navbar>
        <f7-list form>
            <f7-list>
                <f7-list-item
                        @click="generateData('kun')"
                        radio value="kun"
                        :checked="user.gender === 'kun'"
                        title="kun"></f7-list-item>
                <f7-list-item
                        @click="generateData('tyan')"
                        radio value="tyan"
                        :checked="user.gender === 'tyan'"
                        title="tyan"></f7-list-item>
            </f7-list>
            <f7-list-item>
                <f7-button fill raised @click="signup">Sign Up</f7-button>
            </f7-list-item>
        </f7-list>
    </f7-page>
</template>
<script>
    import {db, auth} from "../database";
    import faker from "faker";

    export default {
        name: 'signup',
        data() {
            return {
                user: {
                    gender: 'kun',
                    email: '',
                    password: '',
                    avatar: ''
                }
            }
        },
        firebase: {
            boys: db.ref('names/boys'),
            girls: db.ref('names/girls')
        },
        methods: {
            signup() {
                let self = this;
                auth.createUserWithEmailAndPassword(self.user.email, self.user.password).then(user => {
                    if (user) {
                        let auser = auth.currentUser;
                        auser.updateProfile({
                            photoURL: JSON.stringify({
                                avatar: self.user.avatar,
                                name: self.user.name,
                                colorScheme: self.user.colorScheme
                            }),
                        }).then(function () {
                            self.$router.replace('/chat/')
                        }).catch(function (error) {
                            console.log(error)
                        });


                    } else {
                        alert('Error')
                    }
                });
            },
            logout() {
                auth.signOut()
                    .then(() => {
                        this.$f7router.navigate('/');
                    });
            },
            getEmail() {
                let date = Date.now();
                return 'b' + date + '@yandex.com';
            },
            getAvatar(gender) {
                let img;
                if (gender === 'kun') {
                    img = faker.random.number({min: 1, max: 3});
                } else {
                    img = faker.random.number({min: 1, max: 3});
                }
                return '/static/assets/images/' + gender + '/' + img + '.jpg';
            },
            getName(gender) {
                let self = this;
                let names;
                if (gender === 'kun') {
                    names = this.boys;
                } else {
                    names = this.girls;
                }
                let n = faker.random.number({min: 0, max: names.length});
                return names[n]['.value'];
            },
            getPassword() {
                return faker.internet.password();
            },
            generateData(gender) {
                let self = this;
                if (!this.boys.length || !this.girls.length) {
                    return;
                }
                self.user = {
                    gender: gender,
                    avatar: self.getAvatar(gender),
                    name: self.getName(gender),
                    email: self.getEmail(),
                    password: self.getPassword(),
                    colorScheme: self.getColorScheme()
                };
            },
            getColorScheme() {
                let schemes = [
                    {
                        color: '#7B886F',
                        border: '#FEFFA5',
                        background: '#B4DC7F'
                    },
                    {
                        color: '#FFA0AC',
                        border: '#B4DC7F',
                        background: '#7B886F'
                    },
                    {
                        color: '#388659',
                        border: '#3AAED8',
                        background: '#52AA8A'
                    },
                    {
                        color: '#3AAED8',
                        border: '#2BD9FE',
                        background: '#3AAED8'
                    },
                    {
                        color: '#322E18',
                        border: '#B7B5E4',
                        background: '#847979'
                    },
                    {
                        color: '#243010',
                        border: '#A1C349',
                        background: '#87A330'
                    },
                    {
                        color: '#767522',
                        border: '#DBF4AD',
                        background: '#CDC776'
                    },
                    {
                        color: '#BC8DA7',
                        border: '#D9D9D9',
                        background: '#BDB4BF'
                    },
                    {
                        color: '#993955',
                        border: '#AE76A6',
                        background: '#A3C3D9'
                    },
                    {
                        color: '#9D6381',
                        border: '#CECCCC',
                        background: '#FDECEF'
                    }
                ];
                let n = faker.random.number({min: 0, max: schemes.length - 1});
                return schemes[n];
            }
        },
        mounted() {
            this.generateData('kun');
        }
    }
</script>
